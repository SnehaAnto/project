import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../login/user.schema';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}