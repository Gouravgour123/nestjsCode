import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule,UserModule, 
    
    JwtModule.register({
      secret : "key",
      signOptions : {
        expiresIn : "60s"
      }
    })],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy ,AuthService],
  exports: [AuthService]
})
export class AuthModule {}