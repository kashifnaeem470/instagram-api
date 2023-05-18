import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { jwtConatstant } from 'src/auth/jwt.constant';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);


    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const jwtService = new JwtService(/* optional: pass your configuration */);
      const configService = new ConfigService(/* optional: pass your configuration */);
      const payload = jwtService.verify(token, {
        secret: configService.get('JWT_SECRET'),
      });
      return { username: payload.username, id: payload.id };
    } catch {
      throw new UnauthorizedException();
    }
  },
);


function extractTokenFromHeader(request: Request): string | undefined {
  const authorization = request.headers['authorization'];

  if (!authorization || Array.isArray(authorization)) {
    throw new Error('Invalid Authorization Header');
  }

  const [type, token] = authorization.split(' ');
  return type === 'Bearer' ? token : undefined;
}
