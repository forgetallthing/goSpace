import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserStairSummaryDocument = HydratedDocument<UserStairSummary>;

@Schema({ timestamps: true, collection: 'user_stair_summaries' })
export class UserStairSummary {
  @Prop({ type: Types.ObjectId, auto: true })
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId!: Types.ObjectId;

  @Prop({ default: 0 })
  totalFloors!: number;

  @Prop({ default: 0 })
  totalMeters!: number;

  @Prop()
  latestRecordTime?: Date;
}

export const UserStairSummarySchema = SchemaFactory.createForClass(UserStairSummary);