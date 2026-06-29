import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { MEDAL_STATUS } from '../common/status';

export type MedalConfigDocument = HydratedDocument<MedalConfig>;

@Schema({ timestamps: true, collection: 'medal_configs' })
export class MedalConfig {
  @Prop({ type: Types.ObjectId, auto: true })
  _id!: Types.ObjectId;

  @Prop({ required: true })
  medalKey!: string;

  @Prop()
  shortName?: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop()
  iconImage?: string;

  @Prop()
  backgroundImage?: string;

  @Prop({ default: 'sparkle' })
  animationPreset?: string;

  @Prop({ default: 1200 })
  animationDuration?: number;

  @Prop({ required: true })
  baseMeters!: number;

  @Prop({ required: true })
  unlockMeters!: number;

  @Prop({ required: true, enum: [1, 2, 3] })
  starLevel!: 1 | 2 | 3;

  @Prop({ required: true, default: 0 })
  sortOrder!: number;

  @Prop({ default: MEDAL_STATUS.ENABLED })
  status!: string;
}

export const MedalConfigSchema = SchemaFactory.createForClass(MedalConfig);
MedalConfigSchema.index({ medalKey: 1, starLevel: 1 }, { unique: true });
MedalConfigSchema.index({ status: 1, sortOrder: 1 });