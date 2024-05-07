import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { User } from 'src/models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logOutUser(@CurrentUser() user: User) {
    return this.userService.logOutUser(user);
  }
}
