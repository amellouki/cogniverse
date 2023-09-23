import {
  BotAvatar,
  ConversationalBotConfiguration,
  RcBotConfiguration,
  LmConfig,
  RcBot,
  ConversationalBot,
  ThirdPartyIntegration,
} from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { BOT_CONFIG_VERSION_V0_0_1 } from '@my-monorepo/shared';
import { BotType } from '@my-monorepo/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { SecureRequest } from '../../types/secure-request';

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

  @ApiProperty()
  thirdPartyIntegration?: ThirdPartyIntegration;
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

  @ApiProperty()
  thirdPartyIntegration?: ThirdPartyIntegration;
}

export class RcBotDto extends SecureRequest implements RcBot {
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

  @ApiProperty()
  boundDocumentId: number | null;

  boundDocument: null;

  creatorId: string;

  @ApiProperty()
  public: boolean;
}

export class ConversationalBotDto
  extends SecureRequest
  implements ConversationalBot
{
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

  @ApiProperty()
  boundDocumentId: null;

  boundDocument: null;

  creatorId: string;

  @ApiProperty()
  public: boolean;
}

export type BotDto = RcBotDto | ConversationalBotDto;

export type CreateBotDto = Omit<BotDto, 'id' | 'boundDocument' | 'creatorId'>;

export type UpdateBotDto = Omit<BotDto, 'boundDocument' | 'creatorId'>;
