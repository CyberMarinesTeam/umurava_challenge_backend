import { Controller, Post, Param, UseGuards, Get, Body } from '@nestjs/common';
import { ParticipantsService } from '../services/participants.service';
import { Participant } from '../models/participants.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  // @UseGuards(AuthGuard) // Protect the route with authentication
  @Post(':userId/start/:challengeId')
  async startChallenge(
    @Param('userId') userId: string,
    @Param('challengeId') challengeId: string,
  ): Promise<Participant> {
    console.log('challenge start working');
    return await this.participantsService.startChallenge(userId, challengeId);
  }
  @Get(':userId/:status')
  async getChallengesByUserWithStatus(
    @Param('userId') userId: string,
    @Param('status') status: string,
  ) {
    return this.participantsService.getChallengesByUserWithStatus(
      userId,
      status,
    );
  }
  @Get('/status/:userId/:challengeId')
  async getStatus(
    @Param('userId') userId: string,
    @Param('challengeId') challengeId: string,
  ) {
    return this.participantsService.getStatus(userId, challengeId);
  }
}
