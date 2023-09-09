import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}

  async validate(access_token: string) {
    try {
      await this.jwtService.verifyAsync(access_token);
      return { invalid: false };
    } catch (e) {
      return { invalid: true };
    }
  }
}
