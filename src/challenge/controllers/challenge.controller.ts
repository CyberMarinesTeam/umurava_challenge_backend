/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ChallengeService } from '../services/challenge.service';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ChallengeIdResponse,
  CreateChallengeResponse,
  DeleteChallengeIdResponse,
  GetChallengesResponse,
  UpdateChallengeResponse,
} from '../dto/response.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Challenge')
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @ApiResponse({
    status: 201,
    type: CreateChallengeResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createChallenge(
    @Res() response,
    @Body() createChallengeDto: CreateChallengeDto,
  ) {
    try {
      const newChallenge =
        await this.challengeService.createChallenge(createChallengeDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Challenge has been created successfully',
        newChallenge,
      });
    } catch (err: any) {
      console.log(err);

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Challenge not created!',
        error: 'Bad Request',
      });
    }
  }

  @ApiResponse({
    status: 201,
    type: UpdateChallengeResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('/:id')
  async updateChallenge(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateChallengeDto,
  ) {
    try {
      const Challenge = await this.challengeService.updateChallenge(
        studentId,
        updateStudentDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Challenge has been successfully updated',
        Challenge,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({
    status: 201,
    type: GetChallengesResponse,
  })
  @ApiResponse({ status: 403, description: 'forbidden' })
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getChallenges(@Res() response) {
    try {
      const Challenges = await this.challengeService.getAllChallenges();
      return response.status(HttpStatus.OK).json({
        message: 'All Challenges data found successfully',
        Challenges,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({
    status: 201,
    type: CreateChallengeDto,
    isArray: true,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(CacheInterceptor)
  @Get('open')
  async findOpenChallenges() {
    return this.challengeService.getOpenChallenges();
  }

  @ApiResponse({
    status: 201,
    type: CreateChallengeDto,
    isArray: true,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(CacheInterceptor)
  @Get('ongoing')
  async findOngoingChallenges() {
    return this.challengeService.getOngoingChallenges();
  }

  @ApiResponse({
    status: 201,
    type: CreateChallengeDto,
    isArray: true,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(CacheInterceptor)
  @Get('completed')
  async findCompletedChallenges() {
    return this.challengeService.getCompletedChallenges();
  }

  @ApiResponse({
    status: 201,
    type: ChallengeIdResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  async getChallenge(@Res() response, @Param('id') challengeId: string) {
    try {
      const Challenge = await this.challengeService.getChallenge(challengeId);
      return response.status(HttpStatus.OK).json({
        message: 'Challenge found successfully',
        Challenge,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({
    status: 201,
    type: DeleteChallengeIdResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete('/:id')
  async deleteChallenge(@Res() response, @Param('id') challengeId: string) {
    try {
      const deletedChallenge =
        await this.challengeService.deleteChallenge(challengeId);
      return response.status(HttpStatus.OK).json({
        message: 'Challenge deleted successfully',
        deletedChallenge,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
