import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserStairSummary, UserStairSummarySchema } from '../../schemas/user-stair-summary.schema';
import { UserMedalStatus, UserMedalStatusSchema } from '../../schemas/user-medal-status.schema';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserStairSummary.name, schema: UserStairSummarySchema },
      { name: UserMedalStatus.name, schema: UserMedalStatusSchema },
    ]),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
})
export class AdminUsersModule {}