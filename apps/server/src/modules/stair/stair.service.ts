import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedalConfig, MedalConfigDocument } from '../../schemas/medal-config.schema';
import { StairRecord, StairRecordDocument } from '../../schemas/stair-record.schema';
import { UserMedalStatus, UserMedalStatusDocument } from '../../schemas/user-medal-status.schema';
import { UserStairSummary, UserStairSummaryDocument } from '../../schemas/user-stair-summary.schema';
import { UsersService } from '../users/users.service';
import { MedalsService } from '../medals/medals.service';
import { CreateStairRecordDto } from './dto/create-stair-record.dto';

@Injectable()
export class StairService {
  constructor(
    private readonly usersService: UsersService,
    private readonly medalsService: MedalsService,
    @InjectModel(StairRecord.name) private readonly stairRecordModel: Model<StairRecordDocument>,
    @InjectModel(UserStairSummary.name) private readonly stairSummaryModel: Model<UserStairSummaryDocument>,
    @InjectModel(MedalConfig.name) private readonly medalConfigModel: Model<MedalConfigDocument>,
    @InjectModel(UserMedalStatus.name) private readonly userMedalStatusModel: Model<UserMedalStatusDocument>,
  ) {}

  async home(userId: string) {
    const summary = await this.stairSummaryModel.findOne({ userId: new Types.ObjectId(userId) }).lean().exec();
    const totalMeters = summary?.totalMeters ?? 0;
    const totalFloors = summary?.totalFloors ?? 0;
    const medalWall = await this.medalsService.buildMedalWall(userId, totalMeters);
    const unlockedMedals = medalWall.filter((item) => item.unlocked);
    const currentMedal = unlockedMedals.at(-1) ?? null;
    const nextMedal = medalWall.find((item) => !item.unlocked) ?? null;

    return {
      userSummary: {
        totalFloors,
        totalMeters,
        latestRecordTime: summary?.latestRecordTime?.toISOString(),
      },
      medalWall,
      currentMedal,
      nextMedal,
      unlockedMedals,
    };
  }

  async createRecord(userId: string, dto: CreateStairRecordDto) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const record = await this.stairRecordModel.create({
      userId: user._id,
      meters: dto.meters,
      floors: dto.floors,
      recordTime: new Date(dto.recordTime),
      remark: dto.remark,
      source: dto.source ?? 'manual',
    });

    const summary = await this.stairSummaryModel.findOneAndUpdate(
      { userId: user._id },
      {
        $inc: { totalMeters: dto.meters, totalFloors: dto.floors },
        latestRecordTime: new Date(dto.recordTime),
      },
      { new: true, upsert: true },
    ).lean().exec();

    const medalConfigs = await this.medalConfigModel.find({ status: 'enabled', unlockMeters: { $lte: summary?.totalMeters ?? dto.meters } }).lean().exec();
    const unlockedMedals = [] as Array<{ medalId: string; name: string; unlocked: boolean }>;

    for (const medal of medalConfigs) {
      const existing = await this.userMedalStatusModel.findOne({ userId: user._id, medalConfigId: medal._id }).exec();
      if (!existing) {
        await this.userMedalStatusModel.create({
          userId: user._id,
          medalConfigId: medal._id,
          unlocked: true,
          unlockedAt: new Date(),
          progressMeters: summary?.totalMeters ?? dto.meters,
          snapshotName: medal.name,
          snapshotUnlockMeters: medal.unlockMeters,
        });
        unlockedMedals.push({ medalId: medal._id.toString(), name: medal.name, unlocked: true });
      } else if (!existing.unlocked && (summary?.totalMeters ?? dto.meters) >= medal.unlockMeters) {
        existing.unlocked = true;
        existing.unlockedAt = new Date();
        existing.progressMeters = summary?.totalMeters ?? dto.meters;
        await existing.save();
        unlockedMedals.push({ medalId: medal._id.toString(), name: medal.name, unlocked: true });
      }
    }

    return {
      recordId: record._id.toString(),
      updatedSummary: summary,
      unlockedMedals,
    };
  }

  listRecords(userId: string, page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;
    return Promise.all([
      this.stairRecordModel.find({ userId: new Types.ObjectId(userId) }).sort({ recordTime: -1 }).skip(skip).limit(pageSize).lean().exec(),
      this.stairRecordModel.countDocuments({ userId: new Types.ObjectId(userId) }).exec(),
    ]).then(([list, total]) => ({ list, total }));
  }
}