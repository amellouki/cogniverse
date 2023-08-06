import {
  BotAvatar,
  ConversationalBotConfiguration,
  RcBotConfiguration,
  LmConfig,
  RcBot,
  ConversationalBot,
} from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { BOT_CONFIG_VERSION_V0_0_1 } from '@my-monorepo/shared/dist/constants';
import BotType from '@my-monorepo/shared/dist/types/bot/bot-type';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class ConversationalBotConfigurationDto
  implements ConversationalBotConfiguration
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  version: typeof BOT_CONFIG_VERSION_V0_0_1;

  @ApiProperty()
  type: typeof BotType.CONVERSATIONAL;

  @ApiProperty()
  description: string;

  @ApiProperty()
  avatar: BotAvatar;

  @ApiProperty()
  lm?: LmConfig;
}

export class RcBotConfigurationDto implements RcBotConfiguration {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  version: typeof BOT_CONFIG_VERSION_V0_0_1;

  @ApiProperty()
  type: typeof BotType.RETRIEVAL_CONVERSATIONAL;

  @ApiProperty()
  description: string;

  @ApiProperty()
  avatar: BotAvatar;

  @ApiProperty()
  retrievalLm?: LmConfig;

  @ApiProperty()
  conversationalLm?: LmConfig;
}

export class RcBotDto implements RcBot {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: typeof BotType.RETRIEVAL_CONVERSATIONAL;

  @ApiProperty()
  configVersion: typeof BOT_CONFIG_VERSION_V0_0_1;

  @ApiProperty()
  configuration: Prisma.JsonObject & RcBotConfigurationDto;
}

export class ConversationalBotDto implements ConversationalBot {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: typeof BotType.CONVERSATIONAL;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  configVersion: typeof BOT_CONFIG_VERSION_V0_0_1;

  @ApiProperty()
  configuration: Prisma.JsonObject & ConversationalBotConfigurationDto;
}

export type BotDto = RcBotDto | ConversationalBotDto;

export type CreateBotDto = Omit<BotDto, 'id'>
