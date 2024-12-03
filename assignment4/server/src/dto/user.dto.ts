import { IsEmail, IsString, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';
import { Role } from '../auth/enums/role.enum';

export class Task {
    @IsString()
    @IsNotEmpty()
    title: string;
    isActive: boolean;
    id: string;
}

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    username: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @IsArray()
    @IsOptional()
    tasks: Task[];
}
