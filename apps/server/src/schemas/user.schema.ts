import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { USER_STATUS } from '../common/status';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  _id!: Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  openid!: string;

  @Prop()
  unionid?: string;

  @Prop()
  nickname?: string;

  @Prop()
  avatarUrl?: string;

  @Prop()
  gender?: number;

  @Prop()
  birthday?: string;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;

  @Prop({ default: USER_STATUS.ACTIVE })
  status!: string;

  @Prop({ default: 0 })
  totalFloors!: number;

  @Prop({ default: 0 })
  totalMeters!: number;

  @Prop()
  latestRecordTime?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);