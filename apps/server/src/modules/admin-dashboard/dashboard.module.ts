import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserStairSummary, UserStairSummarySchema } from '../../schemas/user-stair-summary.schema';
import { StairRecord, StairRecordSchema } from '../../schemas/stair-record.schema';
import { MedalConfig, MedalConfigSchema } from '../../schemas/medal-config.schema';
import { UserMedalStatus, UserMedalStatusSchema } from '../../schemas/user-medal-status.schema';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserStairSummary.name, schema: UserStairSummarySchema },
      { name: StairRecord.name, schema: StairRecordSchema },
      { name: MedalConfig.name, schema: MedalConfigSchema },
      { name: UserMedalStatus.name, schema: UserMedalStatusSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}