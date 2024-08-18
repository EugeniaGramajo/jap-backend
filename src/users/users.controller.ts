import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto, ResponseLoginUserDto } from 'src/DTOs/login.dto';
import { CreateUserDto } from 'src/DTOs/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ResponseLoginUserDto> {
    return await this.usersService.login(loginUserDto);
  }
}
