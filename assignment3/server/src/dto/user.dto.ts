import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    username: string;

    @IsString()
    role: "HR" | "Employee";
}
