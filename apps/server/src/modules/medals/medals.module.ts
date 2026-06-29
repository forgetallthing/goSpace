import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedalConfig, MedalConfigSchema } from '../../schemas/medal-config.schema';
import { UserMedalStatus, UserMedalStatusSchema } from '../../schemas/user-medal-status.schema';
import { AdminMedalsController, MedalsController } from './medals.controller';
import { MedalsService } from './medals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedalConfig.name, schema: MedalConfigSchema },
      { name: UserMedalStatus.name, schema: UserMedalStatusSchema },
    ]),
  ],
  controllers: [MedalsController, AdminMedalsController],
  providers: [MedalsService],
  exports: [MedalsService],
})
export class MedalsModule {}