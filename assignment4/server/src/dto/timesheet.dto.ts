import { IsNotEmpty, IsString, IsNumber, Min, Max, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class TimesheetDto {
    @IsNotEmpty()
    @IsDateString()
    readonly date: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value?.trim())
    readonly project: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(8)
    readonly hours: number;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value?.trim())
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly userId: string;
}