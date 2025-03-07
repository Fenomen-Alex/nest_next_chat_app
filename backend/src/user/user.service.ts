import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });
    return this.usersRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async updateUser(updateDto: { name?: string; email?: string; role?: UserRole }): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email: updateDto.email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (updateDto.name) user.name = updateDto.name;
    if (updateDto.email) user.email = updateDto.email;
    if (updateDto.role) user.role = updateDto.role;

    return await this.usersRepository.save(user);
  }
}
