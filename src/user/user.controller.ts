import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.service.register(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
