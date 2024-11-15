import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from '../dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const identifier = loginDto.email || loginDto.username;
        return await this.authService.signIn(identifier, loginDto.password);
    }

    @Post('register')
    async register(@Body() registerDto: CreateUserDto) {
        return await this.authService.signUp(registerDto);
    }

    @Get('users')
    async getAllUsers() {
        return this.authService.findAllUsers();
    }
} 