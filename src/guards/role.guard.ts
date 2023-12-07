import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user && user.role === 'admin') {
      return true;
    }

    throw new UnauthorizedException(
      'You do not have permission to access this resource.',
    );
  }
}
