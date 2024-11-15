import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        MongooseModule.forRoot(process.env.MONGODB_URI, {}),
        TimesheetModule,
        LoginModule
    ],
})
export class AppModule {}
