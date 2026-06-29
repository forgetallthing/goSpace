import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type StairRecordDocument = HydratedDocument<StairRecord>;

@Schema({ timestamps: true, collection: 'stair_records' })
export class StairRecord {
  @Prop({ type: Types.ObjectId, auto: true })
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  meters!: number;

  @Prop({ required: true })
  floors!: number;

  @Prop({ required: true })
  recordTime!: Date;

  @Prop()
  remark?: string;

  @Prop({ default: 'manual' })
  source!: string;
}

export const StairRecordSchema = SchemaFactory.createForClass(StairRecord);
StairRecordSchema.index({ userId: 1, recordTime: -1 });