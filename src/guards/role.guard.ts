import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user.role === 'admin') {
      return true;
    }

    throw new HttpException('Something went wrong...', HttpStatus.NOT_FOUND);
  }
}
