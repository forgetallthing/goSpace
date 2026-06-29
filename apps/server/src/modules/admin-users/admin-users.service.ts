import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UserStairSummary, UserStairSummaryDocument } from '../../schemas/user-stair-summary.schema';
import { UserMedalStatus, UserMedalStatusDocument } from '../../schemas/user-medal-status.schema';

export interface AdminUserListItem {
  _id: unknown;
  nickname?: string;
  openid?: string;
  unionid?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  stairSummary: {
    totalFloors: number;
    totalMeters: number;
  };
  medalCount: number;
}

export interface AdminUsersListResult {
  list: AdminUserListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AdminUserDetailResult {
  profile: Record<string, unknown> | null;
  stairSummary: {
    totalFloors: number;
    totalMeters: number;
  };
  medalCount: number;
}

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserStairSummary.name) private readonly summaryModel: Model<UserStairSummaryDocument>,
    @InjectModel(UserMedalStatus.name) private readonly userMedalStatusModel: Model<UserMedalStatusDocument>,
  ) {}

  async list(keyword = '', page = 1, pageSize = 20): Promise<AdminUsersListResult> {
    const skip = Math.max(page - 1, 0) * pageSize;
    const filter = keyword
      ? {
          $or: [
            { nickname: { $regex: keyword, $options: 'i' } },
            { openid: { $regex: keyword, $options: 'i' } },
            { unionid: { $regex: keyword, $options: 'i' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.userModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize).lean().exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);

    const list = await Promise.all(
      users.map(async (user) => {
        const [summary, medalCount] = await Promise.all([
          this.summaryModel.findOne({ userId: new Types.ObjectId(user._id) }).lean().exec(),
          this.userMedalStatusModel.countDocuments({ userId: new Types.ObjectId(user._id), unlocked: true }).exec(),
        ]);

        return {
          ...user,
          stairSummary: summary ?? { totalFloors: 0, totalMeters: 0 },
          medalCount,
        };
      }),
    );

    return { list, total, page, pageSize };
  }

  async detail(userId: string): Promise<AdminUserDetailResult> {
    const [user, summary, medalCount] = await Promise.all([
      this.userModel.findById(userId).lean().exec(),
      this.summaryModel.findOne({ userId: new Types.ObjectId(userId) }).lean().exec(),
      this.userMedalStatusModel.countDocuments({ userId: new Types.ObjectId(userId), unlocked: true }).exec(),
    ]);

    return {
      profile: user,
      stairSummary: summary ?? { totalFloors: 0, totalMeters: 0 },
      medalCount,
    };
  }
}