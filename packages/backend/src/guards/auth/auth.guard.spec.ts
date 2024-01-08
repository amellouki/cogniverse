import { AuthGuard } from './auth.guard';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import {
  configServiceMock,
  executionContextMock,
  httpArgumentsHostMock,
  jwtServiceMock,
  reflectorMock,
} from 'src/mocks';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard = null;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: Reflector,
          useValue: reflectorMock,
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should activate if public', async () => {
    reflectorMock.getAllAndOverride.mockReturnValueOnce(true); // isPublic
    const canActivate = await authGuard.canActivate(executionContextMock);
    expect(canActivate).toEqual(true);
  });

  it('should activate when token is valid', async () => {
    reflectorMock.getAllAndOverride.mockReturnValueOnce(false);
    jwtServiceMock.verifyAsync.mockResolvedValueOnce({});
    httpArgumentsHostMock.getRequest.mockReturnValueOnce({
      headers: {
        authorization: 'Bearer token',
      },
    });
    const canActivate = await authGuard.canActivate(executionContextMock);
    expect(canActivate).toEqual(true);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    reflectorMock.getAllAndOverride.mockReturnValueOnce(false);
    jwtServiceMock.verifyAsync.mockRejectedValueOnce({});
    httpArgumentsHostMock.getRequest.mockReturnValueOnce({
      headers: {
        authorization: 'Bearer token',
      },
    });
    await expect(() =>
      authGuard.canActivate(executionContextMock),
    ).rejects.toThrow(UnauthorizedException);
  });
});
