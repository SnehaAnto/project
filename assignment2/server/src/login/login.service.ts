import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findUser(identifier: string, password: string) {
    const user = await this.userModel.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ],
      password
    }).exec();
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const { password: _, ...result } = user.toObject();
    return result;
  }

  async findAllUsers() {
    return this.userModel.find().exec();
  }
} 