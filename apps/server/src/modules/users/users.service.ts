import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User, UserDocument } from '../../schemas/user.schema';
import { UserStairSummary, UserStairSummaryDocument } from '../../schemas/user-stair-summary.schema';
import { UserMedalStatus, UserMedalStatusDocument } from '../../schemas/user-medal-status.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserStairSummary.name) private readonly stairSummaryModel: Model<UserStairSummaryDocument>,
    @InjectModel(UserMedalStatus.name) private readonly userMedalStatusModel: Model<UserMedalStatusDocument>,
  ) {}

  findByOpenid(openid: string) {
    return this.userModel.findOne({ openid }).exec();
  }

  findById(userId: string) {
    return this.userModel.findById(userId).exec();
  }

  async findOrCreateByOpenid(openid: string, unionid?: string) {
    let user = await this.findByOpenid(openid);
    if (!user) {
      user = await this.userModel.create({ openid, unionid });
      await this.stairSummaryModel.create({ userId: user._id, totalFloors: 0, totalMeters: 0 });
    }
    return user;
  }

  async getProfile(userId: string) {
    const [user, summary, medalCount] = await Promise.all([
      this.userModel.findById(userId).lean().exec(),
      this.stairSummaryModel.findOne({ userId: new Types.ObjectId(userId) }).lean().exec(),
      this.userMedalStatusModel.countDocuments({ userId: new Types.ObjectId(userId), unlocked: true }).exec(),
    ]);

    return {
      profile: user,
      stairSummary: summary ?? { totalFloors: 0, totalMeters: 0 },
      medalCount,
    };
  }

  updateProfile(userId: string, dto: UpdateUserProfileDto) {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).lean().exec();
  }

  async updateStairSummary(userId: Types.ObjectId, totalFloors: number, totalMeters: number, latestRecordTime: Date) {
    return this.stairSummaryModel
      .findOneAndUpdate(
        { userId },
        { totalFloors, totalMeters, latestRecordTime },
        { new: true, upsert: true },
      )
      .lean()
      .exec();
  }
}