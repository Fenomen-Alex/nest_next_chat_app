import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    // Generate a new secret key programmatically
    this.jwtSecret = crypto.randomBytes(32).toString('hex'); // Generate a 32-byte hex string
  }

  async register(name: string, email: string, password: string): Promise<{
    user: User;
    token: string;
    refreshToken: string
  }> {
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, email, password: hashedPassword });
    await this.usersRepository.save(user);

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret, expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { secret: this.jwtSecret, expiresIn: '7d' });

    return { user, token: accessToken, refreshToken };
  }

  async refresh_token(refreshToken: string): Promise<{ token: string }> {
    const decoded = this.jwtService.verify(refreshToken, { secret: this.jwtSecret });

    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersRepository.findOne({ where: { email: decoded.email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const accessToken = this.jwtService.sign({ email: user.email, sub: user.id }, { secret: this.jwtSecret, expiresIn: '1h' });

    return { token: accessToken };
  }

  async validateUser (email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user; // Exclude password from the result
      return result;
    }
    return null;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.validateUser (email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      user,
      token: this.jwtService.sign(payload, { secret: this.jwtSecret })
    };
  }

  getJwtSecret(): string {
    return this.jwtSecret;
  }
}
