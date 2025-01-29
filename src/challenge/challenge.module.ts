/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ChallengeService } from './services/challenge.service';
import { ChallengeController } from './controllers/challenge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './models/challenge.model';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]),
    AuthModule,
    NotificationModule,
  ],
  providers: [ChallengeService],
  controllers: [ChallengeController],
})
export class ChallengeModule {}
