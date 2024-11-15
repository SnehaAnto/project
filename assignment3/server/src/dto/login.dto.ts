import { IsNotEmpty, IsEmail, IsString, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
    @ValidateIf(o => !o.username)
    @IsEmail()
    @Transform(({ value }) => value?.trim())
    readonly email?: string;

    @ValidateIf(o => !o.email)
    @IsString()
    @Transform(({ value }) => value?.trim())
    readonly username?: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value?.trim())
    readonly password: string;
}