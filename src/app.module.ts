import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRoot(process.env.MONGODB_URL),
    CatsModule,
    UserModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
