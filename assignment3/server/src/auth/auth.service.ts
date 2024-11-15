import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async findUser(identifier: string) {
        const user = await this.userModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        }).exec();
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        
        return user.toObject();
    }

    async findAllUsers() {
        return this.userModel.find().exec();
    }

    async signIn(identifier: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.findUser(identifier);
        const isMatch = await bcrypt.compare(pass, user.password);
        
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, email: user.email, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(registerDto: CreateUserDto) {
          const hashedPassword = await bcrypt.hash(
            registerDto.password, 
            parseInt(this.configService.get('SALT_ROUNDS'))
        );
        return this.userModel.create({
            ...registerDto,
            password: hashedPassword
        });
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
} 