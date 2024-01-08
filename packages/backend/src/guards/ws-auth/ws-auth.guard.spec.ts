import { WsAuthGuard } from './ws-auth.guard';
import { Test } from '@nestjs/testing';
import {
  AUTH_PAYLOAD_MOCK,
  executionContextMock,
  jwtServiceMock,
  wsArgumentsHostMock,
} from 'cogniverse-backend/mocks';
import { JwtService } from '@nestjs/jwt';

describe('WsAuthGuard', () => {
  let guard: WsAuthGuard;
  beforeEach(async () => {
    wsArgumentsHostMock.getData.mockClear();
    const module = await Test.createTestingModule({
      providers: [
        WsAuthGuard,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    guard = module.get<WsAuthGuard>(WsAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should activate when token is valid', async () => {
    wsArgumentsHostMock.getClient.mockReturnValueOnce({
      client: {
        handshake: {
          query: {
            token: 'token',
          },
        },
      },
    });
    wsArgumentsHostMock.getData.mockReturnValueOnce({
      authPayload: null,
    });
    jwtServiceMock.verifyAsync.mockResolvedValueOnce(AUTH_PAYLOAD_MOCK);
    const canActivate = await guard.canActivate(executionContextMock);
    expect(canActivate).toEqual(true);
  });

  it('should attach auth payload to data', async () => {
    wsArgumentsHostMock.getClient.mockReturnValueOnce({
      client: {
        handshake: {
          query: {
            token: 'token',
          },
        },
      },
    });
    const data = {
      authPayload: null,
    };
    wsArgumentsHostMock.getData.mockReturnValueOnce(data);
    jwtServiceMock.verifyAsync.mockResolvedValueOnce(AUTH_PAYLOAD_MOCK);
    await guard.canActivate(executionContextMock);
    expect(data.authPayload).toEqual(AUTH_PAYLOAD_MOCK);
  });

  it('should not activate when token is invalid', async () => {
    wsArgumentsHostMock.getClient.mockReturnValueOnce({
      client: {
        handshake: {
          query: {
            token: 'token',
          },
        },
      },
    });
    wsArgumentsHostMock.getData.mockReturnValueOnce({
      authPayload: null,
    });
    jwtServiceMock.verifyAsync.mockRejectedValueOnce(new Error());
    const canActivate = await guard.canActivate(executionContextMock);
    expect(canActivate).toEqual(false);
  });

  it('should not activate when token is not provided', async () => {
    wsArgumentsHostMock.getClient.mockReturnValueOnce({
      client: {
        handshake: {
          query: {},
        },
      },
    });
    wsArgumentsHostMock.getData.mockReturnValueOnce({
      authPayload: null,
    });
    jwtServiceMock.verifyAsync.mockRejectedValueOnce(new Error());
    const canActivate = await guard.canActivate(executionContextMock);
    expect(canActivate).toEqual(false);
  });
});
