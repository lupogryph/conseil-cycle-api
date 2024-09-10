import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async connecter(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (user == null) throw new UnauthorizedException();
    const db_hash = Buffer.from(user.password, 'hex');
    const hash = crypto.scryptSync(password, process.env.SALT, 12);
    if (crypto.timingSafeEqual(db_hash, hash)) {
      return {
        access_token: await this.jwtService.signAsync({
          sub: user.id,
          email: user.email,
          role: user.role,
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
