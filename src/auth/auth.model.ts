import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from './enums/role.enum';

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: false })
  password: string;
  @Prop({ enum: RoleEnum, required: true })
  role: RoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(Users);