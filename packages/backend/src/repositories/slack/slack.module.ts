import { Module } from '@nestjs/common';
import { SlackEntity } from 'src/repositories/slack/slack.entity';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SlackEntity],
  exports: [SlackEntity],
})
export class SlackModule {}
