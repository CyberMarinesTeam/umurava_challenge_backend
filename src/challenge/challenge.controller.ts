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
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { UpdateChallengeDto } from './update-challenge.dto';
import { CreateChallengeDto } from './create-challenge.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Challenge')
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @ApiResponse({ status: 201, description: 'The record has been  created successfully .'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Post()
  async createStudent(
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

  @ApiResponse({ status: 201, description: 'The record has been updated successfully .'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Put('/:id')
  async updateChallenge(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateChallengeDto,
  ) {
    try {
      const existingStudent = await this.challengeService.updateChallenge(
        studentId,
        updateStudentDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Student has been successfully updated',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({ status: 201, description: 'The record has been fetched successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Get()
  async getStudents(@Res() response) {
    try {
      const studentData = await this.challengeService.getAllChallenges();
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        studentData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({ status: 201, description: 'The open records has been successfully fetched.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Get('open')
  async findOpenChallenges() {
    return this.challengeService.getOpenChallenges();
  }

  @ApiResponse({ status: 201, description: 'The ongoing records has been successfully fetched.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Get('ongoing')
  async findOngoingChallenges() {
    return this.challengeService.getOngoingChallenges();
  }

  @ApiResponse({ status: 201, description: 'The completed records has been successfully fetched.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Get('completed')
  async findCompletedChallenges() {
    return this.challengeService.getCompletedChallenges();
  }

  @ApiResponse({ status: 201, description: 'The specific record has been successfully fetched.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Get('/:id')
  async getChallenge(@Res() response, @Param('id') challengeId: string) {
    try {
      const existingChallenge =
        await this.challengeService.getChallenge(challengeId);
      return response.status(HttpStatus.OK).json({
        message: 'Challenge found successfully',
        existingChallenge,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({ status: 201, description: 'The specic  record has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Delete('/:id')
  async deleteChallenge(@Res() response, @Param('id') challengeId: string) {
    try {
      const deletedChallenge =
        await this.challengeService.deleteChallenge(challengeId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deletedChallenge,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
