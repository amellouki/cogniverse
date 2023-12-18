import { mockDeep } from 'jest-mock-extended';
import { ConfigService } from '@nestjs/config';

export const configServiceMock = mockDeep<ConfigService>();
