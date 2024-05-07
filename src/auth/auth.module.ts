import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],

  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
