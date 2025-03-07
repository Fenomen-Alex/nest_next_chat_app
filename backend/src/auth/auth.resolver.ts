import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;

  @Field()
  refresh_token: string;
}

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  access_token: string;
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

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(@Args('refreshToken') refreshToken: string): Promise<{ access_token: string }> {
    return this.authService.refreshToken(refreshToken);
  }
}
