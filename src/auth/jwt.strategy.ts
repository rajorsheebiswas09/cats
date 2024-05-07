import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    });
  }

  async validate(payload: any) {
    const foundUser = await this.userModel.findById(payload._id);
    if (!foundUser.isLoggedIn) {
      throw new UnauthorizedException();
    }

    return foundUser;
  }
}
