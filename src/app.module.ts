/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ChallengeModule,
    MongooseModule.forRoot(process.env.MONGO_URL as string, {
      dbName: 'skill_challengedb',
    }),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
