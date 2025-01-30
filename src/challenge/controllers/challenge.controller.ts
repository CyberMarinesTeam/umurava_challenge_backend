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
  UseGuards,
  Inject,
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
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RoleEnum } from 'src/auth/enums/role.enum';
import { NotificationGateway } from 'src/notification/gateways/notification.gateway';
import { Cache } from 'cache-manager';

@ApiTags('Challenge')
@Controller('challenges')
export class ChallengeController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly challengeService: ChallengeService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @ApiResponse({
    status: 201,
    type: CreateChallengeResponse,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post(':id')
  async createChallenge(
    @Res() response,
    @Body() createChallengeDto: CreateChallengeDto,
    @Param(':id') id: string,
  ) {
    try {
      const newChallenge =
        await this.challengeService.createChallenge(createChallengeDto);
      try {
        await this.notificationGateway.sendNotification(
          id,
          'Challenge has been created successfully',
        );
      } catch (error) {
        console.log(error);
      }
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
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
    @Body() userId: string,
  ) {
    try {
      const Challenge = await this.challengeService.updateChallenge(
        studentId,
        updateStudentDto,
      );
      await this.notificationGateway.sendNotification(
        userId,
        'Challenge has been successfully updated',
      );
      return response.status(HttpStatus.OK).json({
        message: 'Challenge has been successfully updated',
        Challenge,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    type: GetChallengesResponse,
  })
  @ApiResponse({ status: 403, description: 'forbidden' })
  @Get()
  async getChallenges(@Res() response) {
    try {
      const Challenges = await this.challengeService.getAllChallenges();
      await this.cacheManager.set(
        'challenges',
        JSON.parse(JSON.stringify(Challenges)),
      );
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
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
      await this.notificationGateway.BroadCastMessage(
        'Challenge deleted successfully',
      );
      return response.status(HttpStatus.OK).json({
        message: 'Challenge deleted successfully',
        deletedChallenge,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
