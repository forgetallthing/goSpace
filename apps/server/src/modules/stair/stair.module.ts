import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedalConfig, MedalConfigSchema } from '../../schemas/medal-config.schema';
import { StairRecord, StairRecordSchema } from '../../schemas/stair-record.schema';
import { UserMedalStatus, UserMedalStatusSchema } from '../../schemas/user-medal-status.schema';
import { UserStairSummary, UserStairSummarySchema } from '../../schemas/user-stair-summary.schema';
import { MedalsModule } from '../medals/medals.module';
import { UsersModule } from '../users/users.module';
import { StairController } from './stair.controller';
import { StairService } from './stair.service';

@Module({
  imports: [
    UsersModule,
    MedalsModule,
    MongooseModule.forFeature([
      { name: StairRecord.name, schema: StairRecordSchema },
      { name: UserStairSummary.name, schema: UserStairSummarySchema },
      { name: MedalConfig.name, schema: MedalConfigSchema },
      { name: UserMedalStatus.name, schema: UserMedalStatusSchema },
    ]),
  ],
  controllers: [StairController],
  providers: [StairService],
})
export class StairModule {}