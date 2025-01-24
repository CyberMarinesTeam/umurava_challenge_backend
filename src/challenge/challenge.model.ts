import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';

export type ChallengeDocument = Challenge & Document;

@Schema()
export class Challenge {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  deadline: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  moneyPrice: number;

  @Prop({ required: true })
  contactEmail: string;

  @Prop({ required: true })
  projectDescription: string;

  @Prop({ required: true })
  projectBrief: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], required: true })
  tasks: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ default: 'open' })
  status: string;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

ChallengeSchema.virtual('./').get(function (this: ChallengeDocument) {
  const now = moment();
  const createdAt = moment(this.createdAt as Date);
  const endDate = createdAt.clone().add(this.duration, 'days');

  if (now.isBefore(createdAt)) {
    return 'open';
  } else if (now.isSameOrAfter(createdAt) && now.isBefore(endDate)) {
    return 'ongoing';
  } else if (now.isSameOrAfter(endDate)) {
    return 'completed';
  }
});
