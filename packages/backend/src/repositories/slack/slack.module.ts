import { Module } from '@nestjs/common';
import { SlackRepository } from 'src/repositories/slack/slack.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SlackRepository],
  exports: [SlackRepository],
})
export class SlackModule {}
