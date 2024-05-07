import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/models/user.model';
import { Model } from 'mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email.toLowerCase().trim();

    const foundUser = await this.userModel.findOne({ email: email });

    if (!foundUser) {
      throw new NotFoundException('User Not Found');
    }

    const isMatch = await this.authService.comparePasswords(
      foundUser.password,
      loginDto.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }

    await this.userModel.findByIdAndUpdate(foundUser._id, {
      $set: {
        isLoggedIn: true,
      },
    });

    const token = this.authService.getAccessToken(foundUser);

    return token;
  }

  async logOutUser(user: User) {
    await this.userModel.findByIdAndUpdate(user._id, {
      $set: { isLoggedIn: false },
    });

    return 'success';
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async onModuleInit() {
    await this.userModel.updateOne(
      { email: 'rajorshee@tiny.com' },
      {
        $set: {
          name: 'Rajorshee Biswas',
          email: 'rajorshee@tiny.com',
          password:
            '$2a$12$UAIJ3wpeh0fmSdO7Bhh4Q.8TvBWDeOS6L3XZF6gNrI2S..O8NRW.O',
        },
      },
      {
        upsert: true,
      },
    );
  }
}
