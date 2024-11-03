import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetModule } from './timesheet/timesheet.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        MongooseModule.forRoot(process.env.MONGODB_URI, {}),
        TimesheetModule
    ],
})
export class AppModule {}
