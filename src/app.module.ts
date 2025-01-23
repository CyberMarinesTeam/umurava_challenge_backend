/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ChallengeModule,
    MongooseModule.forRoot('mongodb+srv://dufitimana:theo123@cluster0.vuubo.mongodb.net/',{dbName: 'skill_challengedb'}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
