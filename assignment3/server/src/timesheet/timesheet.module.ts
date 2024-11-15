import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { Timesheet, TimesheetSchema } from './timesheet.schema';    
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Timesheet.name, schema: TimesheetSchema }]),
        AuthModule],
    controllers: [TimesheetController],
    providers: [TimesheetService],
})
export class TimesheetModule {}
