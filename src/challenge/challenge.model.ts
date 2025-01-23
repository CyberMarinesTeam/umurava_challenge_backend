/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Challenge extends Document {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  deadline: string;

  @Prop({ required: true })
  duration: number; // in days

  @Prop({ required: true })
  moneyPrice: number;

  @Prop({ required: true })
  contactEmail: string;

  @Prop({ required: true })
  projectDescription: string;

  @Prop({ required: true })
  projectBrief: string;

  @Prop({type:[String], required: true })
  tasks: string[]; 

  @Prop({ required: true })
  category: string; 

  @Prop({ default: 'open' }) 
  status: string; 


  @Prop({default:Date.now})
  createdAt: Date;

}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);