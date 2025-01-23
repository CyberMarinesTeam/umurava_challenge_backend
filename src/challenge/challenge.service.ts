/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Challenge } from './challenge.model';
import { DateTime } from 'luxon';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateChallengeDto } from './update-challenge.dto';
@Injectable()
export class ChallengeService {
  

constructor(@InjectModel('Challenge') private challengeModel:Model<Challenge>) { }


async calculateChallengeStatus(challenge: Challenge): Promise<string> {
    const now = DateTime.now();
    const createdAt = DateTime.fromJSDate(challenge.createdAt);

    // Parse the deadline string in the format dd/mm/yyyy
    const [day, month, year] = challenge.deadline.split('/').map(Number);
    const deadline = DateTime.fromObject({ year, month, day });

    const challengeStartDate = createdAt.plus({ days: challenge.duration });

    if (now < createdAt) {
        return 'open'; 
    } else if (
        now >= createdAt &&
        now <= deadline &&
        now <= challengeStartDate
    ) {
        return 'ongoing'; 
    } else if (now > deadline) {
        return 'completed';
    } else {
        return 'open'; 
    }
}


async getChallengesByStatus(status: string): Promise<Challenge[]> {
  const challenges = await this.challengeModel.find({ status }).exec();
  if (!challenges || challenges.length === 0) {
    throw new NotFoundException(`No challenges found with status: ${status}`);
  }
  return challenges;
}

async getOpenChallenges(): Promise<Challenge[]> {
  return this.getChallengesByStatus('open');
}

async getOngoingChallenges(): Promise<Challenge[]> {
  return this.getChallengesByStatus('ongoing');
}

async getCompletedChallenges(): Promise<Challenge[]> {
  return this.getChallengesByStatus('completed');
}

  async getAllChallenges(): Promise<Challenge[]> {
    const studentData = await this.challengeModel.find();
    if (!studentData || studentData.length == 0) {
        throw new NotFoundException('Challenges data not found!');
    }
    return studentData;
}

async getChallenge(challengeId: string): Promise<Challenge> {
  const existingChallenge = await     this.challengeModel.findById(challengeId).exec();
  if (!existingChallenge) {
   throw new NotFoundException(`Challenge #${challengeId} not found`);
  }
  return existingChallenge;
}
  async createChallenge(challengeData: any): Promise<Challenge> {
    const challenge = new this.challengeModel(challengeData);
    challenge.status = await this.calculateChallengeStatus(challenge);
    return challenge.save();
  }

  async updateChallenge(challengeId: string, updateChallengeData:UpdateChallengeDto  ): Promise<Challenge> {
    const existingChallenge = await this.challengeModel.findByIdAndUpdate(challengeId, updateChallengeData, { new: true });
   if (!existingChallenge) {
     throw new NotFoundException(`Challenge #${challengeId} not found`);
   }
   return existingChallenge;
}

async deleteChallenge(challengeId: string): Promise<Challenge> {
  const deletedChallenge = await this.challengeModel.findByIdAndDelete(challengeId);
 if (!deletedChallenge) {
   throw new NotFoundException(`Challenge #${challengeId} not found`);
 }
 return deletedChallenge;
}

}
