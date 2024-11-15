import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginModule } from './login/login.module';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
        TimesheetModule,
        LoginModule
    ],
})
export class AppModule {}
