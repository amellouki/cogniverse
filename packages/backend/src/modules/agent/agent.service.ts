import { Injectable } from '@nestjs/common';
import { AgentService as AgentRepositoryService } from '../../repositories/agent/agent.service';
import NewRcAgent from '@my-monorepo/shared/dist/new-rc-agent';
import { Prisma } from '@prisma/client';

@Injectable()
export class AgentService {
  constructor(private agent: AgentRepositoryService) {}

  createRcAgent(newAgent: NewRcAgent) {
    const agentData: Prisma.RCAgentCreateInput = {
      name: newAgent.name,
      retrievalLanguageModel: {
        create: newAgent.retrievalLanguageModel,
      },
      conversationModel: {
        create: newAgent.conversationModel,
      },
    };
    return this.agent.createRcAgent(agentData);
  }

  getRcAgentById(id: number) {
    return this.agent.getRcAgentById(id);
  }

  getAgents() {
    return this.agent.getAgents();
  }
}
