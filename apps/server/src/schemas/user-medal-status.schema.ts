import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserMedalStatusDocument = HydratedDocument<UserMedalStatus>;

@Schema({ timestamps: true, collection: 'user_medal_status' })
export class UserMedalStatus {
  @Prop({ type: Types.ObjectId, auto: true })
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'MedalConfig', required: true })
  medalConfigId!: Types.ObjectId;

  @Prop({ default: false })
  unlocked!: boolean;

  @Prop()
  unlockedAt?: Date;

  @Prop({ default: 0 })
  progressMeters!: number;

  @Prop({ required: true })
  snapshotName!: string;

  @Prop({ required: true })
  snapshotUnlockMeters!: number;
}

export const UserMedalStatusSchema = SchemaFactory.createForClass(UserMedalStatus);
UserMedalStatusSchema.index({ userId: 1, medalConfigId: 1 }, { unique: true });
UserMedalStatusSchema.index({ userId: 1, unlocked: 1 });