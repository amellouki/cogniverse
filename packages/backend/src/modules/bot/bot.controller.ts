import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from '../../dto/bot-config/0.0.1.dto';

@Controller('bot')
export class BotController {
  constructor(private agentService: BotService) {}
  @Post('create')
  async createRcAgent(@Body() request: CreateBotDto) {
    console.log('request', request);
    const result = await this.agentService.createBot(request);
    console.log('result', result);
    return result;
  }

  @Get('get-rc')
  async getRcAgent(@Query('id') id: string) {
    return this.agentService.getRcAgentById(Number(id));
  }

  @Get('get-bots')
  async getAgents() {
    return this.agentService.getAgents();
  }
}
