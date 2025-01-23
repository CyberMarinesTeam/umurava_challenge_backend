/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './challenge.model';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }])],
  providers: [ChallengeService],
  controllers: [ChallengeController],
})
export class ChallengeModule {}
