import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SlackService],
  exports: [SlackService],
})
export class SlackModule {}
