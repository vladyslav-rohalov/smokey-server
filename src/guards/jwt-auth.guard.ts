import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BlacklistedTokensService } from '../blacklisted-tokens/blacklisted-tokens.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private blTokenServive: BlacklistedTokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      const isTokenBlacklisted =
        await this.blTokenServive.isBlacklistedToken(token);

      if (isTokenBlacklisted) {
        throw new UnauthorizedException({ message: 'Token is blacklisted' });
      }

      const user = this.jwtService.verify(token);
      req.user = { ...user, token };
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
