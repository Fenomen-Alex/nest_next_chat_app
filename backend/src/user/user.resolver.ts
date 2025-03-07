import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.userService.create(name, email, password);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('name', { nullable: true }) name?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('role', { nullable: true }) role?: UserRole,
  ) {
    return this.userService.updateUser({ name, email, role });
  }
}
