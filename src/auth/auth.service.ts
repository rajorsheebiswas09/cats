import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async comparePasswords(hash: string, password: string) {
    return bcrypt.compare(password, hash);
  }

  async getAccessToken(user: User) {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
