import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { identifier: string; password: string }) {
    return this.loginService.findUser(loginDto.identifier, loginDto.password);
  }

  @Get()
  async getAllUsers() {
    return this.loginService.findAllUsers();
  }

} 