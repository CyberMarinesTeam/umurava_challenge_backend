import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Users } from 'src/auth/models/auth.model';
import { Challenge } from '../../challenge/models/challenge.model';

export type ParticipantDocument = Participant & Document;

@Schema({ timestamps: true })
export class Participant {
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Challenge', required: true })
  challenge: Types.ObjectId;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
