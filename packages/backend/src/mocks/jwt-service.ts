import { mockDeep } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = mockDeep<JwtService>();
