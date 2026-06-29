import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserStairSummary, UserStairSummarySchema } from '../../schemas/user-stair-summary.schema';
import { UserMedalStatus, UserMedalStatusSchema } from '../../schemas/user-medal-status.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserStairSummary.name, schema: UserStairSummarySchema },
      { name: UserMedalStatus.name, schema: UserMedalStatusSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}