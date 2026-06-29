import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomUUID } from 'crypto';
import { Model, Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User, UserDocument } from '../../schemas/user.schema';
import { RefreshToken, RefreshTokenDocument } from '../../schemas/refresh-token.schema';

interface WechatSessionResponse {
  openid: string;
  session_key?: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async loginByWechat(code: string) {
    const session = await this.exchangeCodeForSession(code);
    const user = await this.usersService.findOrCreateByOpenid(session.openid, session.unionid);
    const tokens = await this.issueTokens(user._id.toString(), session.openid);
    return {
      ...tokens,
      needProfileComplete: !user.nickname || !user.avatarUrl,
      user,
    };
  }

  async refresh(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    const tokenRecord = await this.refreshTokenModel.findOne({ tokenHash, revokedAt: { $exists: false } }).lean().exec();
    if (!tokenRecord || tokenRecord.expiredAt.getTime() < Date.now()) {
      throw new UnauthorizedException('refresh token invalid');
    }

    const user = await this.userModel.findById(tokenRecord.userId).lean().exec();
    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    await this.refreshTokenModel.updateOne({ _id: tokenRecord._id }, { revokedAt: new Date() }).exec();
    return this.issueTokens(user._id.toString(), user.openid);
  }

  async logout(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    await this.refreshTokenModel.updateOne({ tokenHash }, { revokedAt: new Date() }).exec();
  }

  private async issueTokens(userId: string, openid: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, openid },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET') ?? 'dev-access-secret',
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '2h',
      },
    );

    const refreshToken = randomUUID();
    const refreshTokenHash = this.hashToken(refreshToken);
    await this.refreshTokenModel.create({
      userId: new Types.ObjectId(userId),
      tokenHash: refreshTokenHash,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private async exchangeCodeForSession(code: string): Promise<{ openid: string; unionid?: string }> {
    const appid = this.configService.get<string>('WECHAT_APPID');
    const secret = this.configService.get<string>('WECHAT_SECRET');
    if (!appid || !secret) {
      return { openid: `mock-${code}` };
    }

    const url = new URL('https://api.weixin.qq.com/sns/jscode2session');
    url.searchParams.set('appid', appid);
    url.searchParams.set('secret', secret);
    url.searchParams.set('js_code', code);
    url.searchParams.set('grant_type', 'authorization_code');

    const response = await fetch(url);
    const data = (await response.json()) as WechatSessionResponse;
    if (!response.ok || data.errcode) {
      throw new UnauthorizedException(data.errmsg ?? 'wechat login failed');
    }

    return { openid: data.openid, unionid: data.unionid };
  }
}