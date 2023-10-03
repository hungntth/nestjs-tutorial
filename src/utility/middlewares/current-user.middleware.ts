import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isArray } from 'class-validator';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const checkAuth =
      !authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ');
    if (checkAuth) {
      return next();
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const { id } = <JwtPayload>verify(token, process.env.ACCESS_TOKEN_JWT);
        const currentUser = await this.userService.findById(+id);
        req.currentUser = currentUser;
        return next();
      } catch (error) {
        console.log(error);
        return next();
      }
    }
  }
}

interface JwtPayload {
  id: string;
}
