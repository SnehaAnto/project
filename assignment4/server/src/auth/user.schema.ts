import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Task } from 'src/dto/user.dto';

@Schema()
export class User extends Document {
  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ unique: true, sparse: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop()
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Custom validator to ensure either email or username is provided
UserSchema.pre('save', function(next) {
  if (!this.email && !this.username) {
    next(new Error('Either email or username must be provided'));
  }
  next();
}); 