import { LoginService } from 'src/modules/authentication/services/login.service';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { jwtServiceMock } from 'cogniverse-backend/mocks';

describe('Unit testing LoginService',() => {
  let service: LoginService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should accept valid token', async () => {
    jwtServiceMock.verifyAsync.mockResolvedValueOnce({});
    expect(await service.validate('valid_token')).toEqual({ invalid: false });
  });

  it('should reject invalid token', async () => {
    jwtServiceMock.verifyAsync.mockRejectedValueOnce({});
    expect(await service.validate('invalid_token')).toEqual({ invalid: true });
  });
});
