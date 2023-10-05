import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto, UpdateBotDto } from '../../dto/bot-config/0.0.1.dto';
import { SecureRequest } from '../../types/secure-request';
import { ZodValidationPipe } from '../../pipes/zod-validation/zod-validation.pipe';
import { botValidation, updateBotValidation } from './valiation.schema';

@Controller('bots')
export class BotController {
  constructor(private agentService: BotService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(botValidation))
  async createBot(
    @Body() body: CreateBotDto,
    @Request() request: SecureRequest,
  ) {
    const creatorId = request.authPayload.uid;
    return this.agentService.createBot(creatorId, body);
  }

  @Patch(':id')
  async updateBot(
    @Param('id', ParseIntPipe) botId: number,
    @Body(new ZodValidationPipe(updateBotValidation)) body: UpdateBotDto,
    @Request() request: SecureRequest,
  ) {
    const creatorId = request.authPayload.uid;
    const bot = await this.agentService.getBotById(botId);
    if (bot.creatorId !== creatorId || body.id !== botId) {
      throw new UnauthorizedException();
    }
    return this.agentService.updateBot(creatorId, botId, body);
  }

  @Delete(':id')
  async deleteBot(
    @Param('id', ParseIntPipe) botId: number,
    @Request() request: SecureRequest,
  ) {
    const creatorId = request.authPayload.uid;
    const bot = await this.agentService.getBotById(botId);
    if (bot.creatorId !== creatorId) {
      throw new UnauthorizedException();
    }
    return this.agentService.deleteBot(botId);
  }

  @Get(':id')
  async getBot(
    @Param('id', ParseIntPipe) botId: number,
    @Request() request: SecureRequest,
  ) {
    const creatorId = request.authPayload.uid;
    const bot = await this.agentService.getBotById(botId);
    if (bot && !bot.public && bot.creatorId !== creatorId) {
      throw new UnauthorizedException();
    }
    return bot;
  }

  @Get()
  async getBots(@Request() request: SecureRequest) {
    return this.agentService.getBotsByCreatorId(request.authPayload.uid);
  }
}
