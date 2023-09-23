import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake?.query?.token;

    try {
      const payload = await this.jwtService.verifyAsync(token);
      context.switchToWs().getData().authPayload = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
}
