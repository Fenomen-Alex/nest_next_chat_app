import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User, UserRole } from '../user/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.register(name, email, password);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.login(email, password);
  }

  @Mutation(() => String)
  async refreshToken(@Args('refreshToken') refreshToken: string): Promise<{ token: string }> {
    return this.authService.refresh_token(refreshToken);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('name', { nullable: true }) name?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('role', { nullable: true }) role?: UserRole,
  ) {
    return this.authService.updateUser({ name, email, role });
  }
}
