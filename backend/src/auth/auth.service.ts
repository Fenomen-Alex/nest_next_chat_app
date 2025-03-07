import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly jwtSecrets: { [key: string]: string };
  private readonly jwtSecretRotationInterval: number;
  private readonly jwtSecretOverlapInterval: number;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService
  ) {
    this.jwtSecrets = {
      current: crypto.randomBytes(32).toString('hex'),
      previous: '',
    };
    this.jwtSecretRotationInterval = 7 * 24 * 60 * 60 * 1000; // 30 days
    this.jwtSecretOverlapInterval = 24 * 60 * 60 * 1000; // 7 days
    this.rotateJwtSecret();
  }

  private async rotateJwtSecret() {
    setTimeout(async () => {
      const newJwtSecret = crypto.randomBytes(32).toString('hex');
      this.jwtSecrets.previous = this.jwtSecrets.current;
      this.jwtSecrets.current = newJwtSecret;
      console.log('JWT secret rotated');
      setTimeout(() => {
        delete this.jwtSecrets.previous;
      }, this.jwtSecretOverlapInterval);
      this.rotateJwtSecret();
    }, this.jwtSecretRotationInterval);
  }

  async register(name: string, email: string, password: string): Promise<{
    user: User;
    token: string;
    refresh_token: string;
  }> {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, email, password: hashedPassword });
    await this.usersRepository.save(user);

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, { secret: this.jwtSecrets.current, expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { secret: this.jwtSecrets.current, expiresIn: '7d' });

    return { user, token, refresh_token };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: this.jwtSecrets.current });
      const user = await this.usersRepository.findOne({ where: { id: payload.sub } });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessToken = this.jwtService.sign({ email: user.email, sub: user.id }, { secret: this.jwtSecrets.current, expiresIn: '1h' });
      return { access_token: accessToken };
    } catch (error) {
      if (this.jwtSecrets.previous) {
        try {
          const payload = this.jwtService.verify(refreshToken, { secret: this.jwtSecrets.previous });
          const user = await this.usersRepository.findOne({ where: { id: payload.sub } });

          if (!user) {
            throw new UnauthorizedException('Invalid refresh token');
          }

          const accessToken = this.jwtService.sign({ email: user.email, sub: user.id }, { secret: this.jwtSecrets.current, expiresIn: '1h' });
          return { access_token: accessToken };
        } catch (error) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async login(email: string, password: string): Promise<{ user: any; token: string; refresh_token: string }> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload, { secret: this.jwtSecrets.current, expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { secret: this.jwtSecrets.current, expiresIn: '7d' });

    return { user, token, refresh_token };
  }

  getJwtSecret(): string {
    return this.jwtSecrets.current;
  }
}
