import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/models/user.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [forwardRef(() => AuthModule), TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
