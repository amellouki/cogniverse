import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { BotService } from './bot.service';
import { BotDto, CreateBotDto } from '../../dto/bot-config/0.0.1.dto';
import { SecureRequest } from '../../types/secure-request';

@Controller('bots')
export class BotController {
  constructor(private agentService: BotService) {}
  @Post()
  async createBot(
    @Body() body: CreateBotDto,
    @Request() request: SecureRequest,
  ) {
    const creatorId = request.authPayload.uid;
    return this.agentService.createBot(creatorId, body);
  }

  @Patch(':id')
  async updateBot(
    @Param('id') id: string,
    @Body() body: BotDto,
    @Request() request: SecureRequest,
  ) {
    const creatorId = request.authPayload.uid;
    const bot = await this.agentService.getBotById(+id);
    if (
      bot.creatorId !== creatorId ||
      body.creatorId !== creatorId ||
      body.id !== +id
    ) {
      throw new UnauthorizedException();
    }
    return this.agentService.updateBot(+id, body);
  }

  @Delete(':id')
  async deleteBot(@Param('id') id: string, @Request() request: SecureRequest) {
    const creatorId = request.authPayload.uid;
    const bot = await this.agentService.getBotById(Number(id));
    if (bot.creatorId !== creatorId) {
      throw new UnauthorizedException();
    }
    return this.agentService.deleteBot(Number(id));
  }

  @Get(':id')
  async getBot(@Param('id') id: string, @Request() request: SecureRequest) {
    const creatorId = request.authPayload.uid;
    const bot = await this.agentService.getBotById(Number(id));
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
