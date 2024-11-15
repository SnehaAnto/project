import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    const identifier = loginDto.email || loginDto.username;
    return this.loginService.findUser(identifier, loginDto.password);
  }

  @Get()
  async getAllUsers() {
    return this.loginService.findAllUsers();
  }
} 