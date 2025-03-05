import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/user.entity';
import { AuthResolver } from './auth.resolver';
import * as crypto from 'crypto';

@Module({
  imports: [
    TypeOrmModule.forFeature([User ]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        // Generate a new secret key programmatically
        const secret = crypto.randomBytes(32).toString('hex'); // Generate a 32-byte hex string
        return {
          secret,
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
