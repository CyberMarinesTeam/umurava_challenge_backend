import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';

export type ChallengeDocument = Challenge & Document;

@Schema()
export class Challenge {
  constructor(
    title: string,
    deadline: string,
    duration: number,
    moneyPrice: number,
    contactEmail: string,
    projectBrief: string,
    createdAt: Date,
    category: string,
    status: string,
    requirements: string[],
    product_design: string[],
    deliverables: string[],
  ) {
    this.title = title;
    this.duration = duration;
    this.deadline = deadline;
    this.moneyPrice = moneyPrice;
    this.contactEmail = contactEmail;
    this.category = category;
    this.projectBrief = projectBrief;
    this.createdAt = createdAt;
    this.status = status;
    this.deliverables = deliverables;
    this.requirements = requirements;
    this.product_design = product_design;
  }
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
  projectBrief: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], required: true })
  requirements: string[];

  @Prop({ type: [String], required: true })
  product_design: string[];

  @Prop({ type: [String], required: true })
  deliverables: string[];

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
