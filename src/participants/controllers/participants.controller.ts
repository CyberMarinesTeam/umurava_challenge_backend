import { Controller, Post, Param, UseGuards } from '@nestjs/common';
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
    return this.participantsService.startChallenge(userId, challengeId);
  }
}
