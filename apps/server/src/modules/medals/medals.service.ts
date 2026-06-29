import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedalConfig, MedalConfigDocument } from '../../schemas/medal-config.schema';
import { UserMedalStatus, UserMedalStatusDocument } from '../../schemas/user-medal-status.schema';
import { CreateMedalConfigDto } from './dto/create-medal-config.dto';
import { QueryMedalAdminDto } from './dto/query-medal-admin.dto';
import { UpdateMedalConfigDto } from './dto/update-medal-config.dto';

export interface MedalConfigPayload {
  medalId: string;
  medalKey: string;
  shortName?: string;
  name: string;
  description: string;
  iconImage?: string;
  backgroundImage?: string;
  animationPreset?: string;
  animationDuration?: number;
  baseMeters: number;
  unlockMeters: number;
  starLevel: 1 | 2 | 3;
  sortOrder: number;
  status: string;
}

export interface MedalListPayload extends MedalConfigPayload {
  unlocked?: boolean;
  progressMeters?: number;
}

export interface AdminMedalListResult {
  list: MedalConfigPayload[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable()
export class MedalsService {
  constructor(
    @InjectModel(MedalConfig.name) private readonly medalConfigModel: Model<MedalConfigDocument>,
    @InjectModel(UserMedalStatus.name) private readonly userMedalStatusModel: Model<UserMedalStatusDocument>,
  ) {}

  async list(status?: 'enabled' | 'disabled') {
    const filter = status ? { status } : {};
    const items = await this.medalConfigModel.find(filter).sort({ sortOrder: 1, unlockMeters: 1 }).lean().exec();
    return {
      list: items.map((item) => this.toPayload(item)),
      total: items.length,
    };
  }

  async listAdmin(query: QueryMedalAdminDto): Promise<AdminMedalListResult> {
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.pageSize ?? 20);
    const skip = Math.max(page - 1, 0) * pageSize;
    const filter: Record<string, unknown> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.keyword) {
      filter.$or = [
        { name: { $regex: query.keyword, $options: 'i' } },
        { medalKey: { $regex: query.keyword, $options: 'i' } },
        { description: { $regex: query.keyword, $options: 'i' } },
      ];
    }

    const [list, total] = await Promise.all([
      this.medalConfigModel.find(filter).sort({ sortOrder: 1, unlockMeters: 1 }).skip(skip).limit(pageSize).lean().exec(),
      this.medalConfigModel.countDocuments(filter).exec(),
    ]);

    return {
      list: list.map((item) => this.toPayload(item)),
      total,
      page,
      pageSize,
    };
  }

  async createConfig(dto: CreateMedalConfigDto): Promise<MedalConfigPayload> {
    const created = await this.medalConfigModel.create({
      ...dto,
      shortName: dto.shortName?.trim() || dto.name,
      sortOrder: dto.sortOrder ?? 0,
      status: dto.status ?? 'enabled',
      animationPreset: dto.animationPreset ?? 'sparkle',
      animationDuration: dto.animationDuration ?? 1200,
    });
    return this.toPayload(created.toObject());
  }

  async updateConfig(medalId: string, dto: UpdateMedalConfigDto): Promise<MedalConfigPayload> {
    const updated = await this.medalConfigModel
      .findByIdAndUpdate(
        medalId,
        {
          ...dto,
          ...(dto.shortName !== undefined ? { shortName: dto.shortName.trim() || dto.name?.trim() } : {}),
          ...(dto.sortOrder !== undefined ? { sortOrder: dto.sortOrder } : {}),
          ...(dto.animationPreset !== undefined ? { animationPreset: dto.animationPreset } : {}),
          ...(dto.animationDuration !== undefined ? { animationDuration: dto.animationDuration } : {}),
        },
        { new: true },
      )
      .lean()
      .exec();

    if (!updated) {
      throw new NotFoundException('medal not found');
    }

    return this.toPayload(updated);
  }

  async deleteConfig(medalId: string) {
    const deleted = await this.medalConfigModel.findByIdAndDelete(medalId).lean().exec();
    if (!deleted) {
      throw new NotFoundException('medal not found');
    }

    return this.toPayload(deleted);
  }

  async getDetail(medalId: string, userId?: string): Promise<MedalListPayload | null> {
    const medal = await this.medalConfigModel.findById(medalId).lean().exec();
    if (!medal) {
      return null;
    }

    const status = userId
      ? await this.userMedalStatusModel.findOne({ userId: new Types.ObjectId(userId), medalConfigId: new Types.ObjectId(medalId) }).lean().exec()
      : null;

    return {
      ...this.toPayload(medal),
      unlocked: status?.unlocked ?? false,
      progressMeters: status?.progressMeters ?? 0,
    };
  }

  async buildMedalWall(userId: string, totalMeters: number): Promise<MedalListPayload[]> {
    const medalConfigs = await this.medalConfigModel.find({ status: 'enabled' }).sort({ sortOrder: 1, unlockMeters: 1 }).lean().exec();
    const statuses = await this.userMedalStatusModel.find({ userId: new Types.ObjectId(userId) }).lean().exec();
    const statusMap = new Map(statuses.map((item) => [item.medalConfigId.toString(), item]));

    return medalConfigs.map((medal) => ({
      ...this.toPayload(medal),
      progressMeters: Math.min(totalMeters, medal.unlockMeters),
      unlocked: (statusMap.get(medal._id.toString())?.unlocked ?? false) || totalMeters >= medal.unlockMeters,
    }));
  }

  private toPayload(medal: {
    _id: Types.ObjectId | { toString(): string };
    medalKey: string;
    shortName?: string;
    name: string;
    description: string;
    iconImage?: string;
    backgroundImage?: string;
    animationPreset?: string;
    animationDuration?: number;
    baseMeters: number;
    unlockMeters: number;
    starLevel: 1 | 2 | 3;
    sortOrder: number;
    status: string;
  }): MedalConfigPayload {
    return {
      medalId: medal._id.toString(),
      medalKey: medal.medalKey,
      shortName: medal.shortName,
      name: medal.name,
      description: medal.description,
      iconImage: medal.iconImage,
      backgroundImage: medal.backgroundImage,
      animationPreset: medal.animationPreset,
      animationDuration: medal.animationDuration,
      baseMeters: medal.baseMeters,
      unlockMeters: medal.unlockMeters,
      starLevel: medal.starLevel,
      sortOrder: medal.sortOrder,
      status: medal.status,
    };
  }
}