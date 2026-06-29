import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UserStairSummary, UserStairSummaryDocument } from '../../schemas/user-stair-summary.schema';
import { StairRecord, StairRecordDocument } from '../../schemas/stair-record.schema';
import { MedalConfig, MedalConfigDocument } from '../../schemas/medal-config.schema';
import { UserMedalStatus, UserMedalStatusDocument } from '../../schemas/user-medal-status.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserStairSummary.name) private readonly summaryModel: Model<UserStairSummaryDocument>,
    @InjectModel(StairRecord.name) private readonly recordModel: Model<StairRecordDocument>,
    @InjectModel(MedalConfig.name) private readonly medalConfigModel: Model<MedalConfigDocument>,
    @InjectModel(UserMedalStatus.name) private readonly userMedalStatusModel: Model<UserMedalStatusDocument>,
  ) {}

  async getStats() {
    const [totalUsers, activeUsers, totalRecords, medalConfigs, enabledMedals, unlockedMedals] = await Promise.all([
      this.userModel.countDocuments().exec(),
      this.userModel.countDocuments({ status: 'active' }).exec(),
      this.recordModel.countDocuments().exec(),
      this.medalConfigModel.countDocuments().exec(),
      this.medalConfigModel.countDocuments({ status: 'enabled' }).exec(),
      this.userMedalStatusModel.countDocuments({ unlocked: true }).exec(),
    ]);

    const [summaryAgg] = await this.summaryModel.aggregate([
      {
        $group: {
          _id: null,
          totalFloors: { $sum: '$totalFloors' },
          totalMeters: { $sum: '$totalMeters' },
        },
      },
    ]);

    const recentUsers = await this.userModel.find().sort({ createdAt: -1 }).limit(5).lean().exec();
    const recentRecords = await this.recordModel.find().sort({ recordTime: -1 }).limit(5).lean().exec();

    return {
      totalUsers,
      activeUsers,
      totalRecords,
      medalConfigs,
      enabledMedals,
      unlockedMedals,
      totalFloors: summaryAgg?.totalFloors ?? 0,
      totalMeters: summaryAgg?.totalMeters ?? 0,
      recentUsers,
      recentRecords,
    };
  }
}