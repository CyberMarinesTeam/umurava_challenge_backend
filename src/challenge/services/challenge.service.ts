/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Challenge } from '../models/challenge.model';
import { DateTime } from 'luxon';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';
@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge') private challengeModel: Model<Challenge>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getChallengesByStatus(status: string): Promise<Challenge[]> {
    const challenges = await this.challengeModel.find({ status }).exec();

    if (!challenges || challenges.length === 0) {
      throw new NotFoundException(`No challenges found with status: ${status}`);
    }
    return challenges;
  }

  async getOpenChallenges(): Promise<Challenge[]> {
    const challenges = await this.getChallengesByStatus('open');
    return challenges;
  }

  async getOngoingChallenges(): Promise<Challenge[]> {
    const challenges = await this.getChallengesByStatus('ongoing');
    return challenges;
  }

  async getCompletedChallenges(): Promise<Challenge[]> {
    const challenges = await this.getChallengesByStatus('completed');
    return challenges;
  }

  async getAllChallenges(): Promise<Challenge[]> {
    const challenges = await this.challengeModel.find();
    if (!challenges || challenges.length == 0) {
      throw new NotFoundException('Challenges data not found!');
    }
    return challenges;
  }

  async getChallenge(challengeId: string): Promise<Challenge> {
    const existingChallenge = await this.challengeModel
      .findById(challengeId)
      .exec();
    if (!existingChallenge) {
      throw new NotFoundException(`Challenge #${challengeId} not found`);
    }
    return existingChallenge;
  }
  async createChallenge(challengeData: any): Promise<Challenge> {
    const challenge = new this.challengeModel(challengeData);
    return challenge.save();
  }

  async updateChallenge(
    challengeId: string,
    updateChallengeData: UpdateChallengeDto,
  ): Promise<Challenge> {
    const existingChallenge = await this.challengeModel.findByIdAndUpdate(
      challengeId,
      updateChallengeData,
      { new: true },
    );
    if (!existingChallenge) {
      throw new NotFoundException(`Challenge #${challengeId} not found`);
    }
    return existingChallenge;
  }

  async deleteChallenge(challengeId: string): Promise<Challenge> {
    const deletedChallenge =
      await this.challengeModel.findByIdAndDelete(challengeId);
    if (!deletedChallenge) {
      throw new NotFoundException(`Challenge #${challengeId} not found`);
    }
    return deletedChallenge;
  }
}
