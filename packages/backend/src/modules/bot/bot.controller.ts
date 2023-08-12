import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from '../../dto/bot-config/0.0.1.dto';

@Controller('bot')
export class BotController {
  constructor(private agentService: BotService) {}
  @Post('create')
  async createBot(@Body() request: CreateBotDto) {
    const result = await this.agentService.createBot(request);
    return result;
  }

  @Get('get-bot')
  async getBot(@Query('id') id: string) {
    return this.agentService.getBotById(Number(id));
  }

  @Get('get-bots')
  async getBots() {
    return this.agentService.getAgents();
  }
}
