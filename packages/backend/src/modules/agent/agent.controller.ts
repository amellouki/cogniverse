import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import CreateRcAgentRequestDto from '../../dto/create-rc-agent-request.dto';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}
  @Post('create-rc')
  async createRcAgent(@Body() request: CreateRcAgentRequestDto) {
    console.log('request', request);
    const result = await this.agentService.createRcAgent(request);
    console.log('result', result);
    return result;
  }

  @Get('get-rc')
  async getRcAgent(@Query('id') id: string) {
    return this.agentService.getRcAgentById(Number(id));
  }

  @Get('get-agents')
  async getAgents() {
    return this.agentService.getAgents();
  }
}
