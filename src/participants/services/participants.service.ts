import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Users } from 'src/auth/models/auth.model';
import { Challenge } from 'src/challenge/models/challenge.model';
import { Participant } from '../models/participants.model';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name)
    private participantModel: Model<Participant>,
    @InjectModel(Challenge.name)
    private challengeModel: Model<Challenge>,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  async startChallenge(
    userId: string,
    challengeId: string,
  ): Promise<Participant> {
    // Check if the challenge exists
    const challenge = await this.challengeModel.findById(challengeId);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    // Check if the user exists
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Check if the user is already participating
    const existingParticipant = await this.participantModel.findOne({
      user: userId,
      challenge: challengeId,
    });
    if (existingParticipant) {
      throw new ConflictException(
        'User or challenge is already participating in this challenge',
      );
    }
    // Create a new participant entry
    const participant = await this.participantModel.create({
      user: userId,
      challenge: challengeId,
    });
    return participant;
  }
  async getChallengesByUserWithStatus(userId: string, status: string) {
    const challenges = await this.participantModel
      .find({ user: userId })
      .populate({
        path: 'challenge',
        match: { status },
      })
      .exec();
    return challenges
      .filter((participant) => participant.challenge !== null)
      .map((participant) => participant.challenge);
  }
  async getStatus(userId: string, challengeId: string) {
    const found = await this.participantModel.findOne({
      user: userId,
      challenge: challengeId,
    });
    return found;
  }
}
