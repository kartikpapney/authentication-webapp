import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from 'src/jwt.strategy';

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const user = await this.jwtService.decodeToken(token);
      if (user.type === 'session') {
        req.body = user;
        next();
      } else {
        throw new UnauthorizedException("Invalid Token")
      }
    } catch {
      throw new UnauthorizedException("Invalid Token")
    }
  }
}
