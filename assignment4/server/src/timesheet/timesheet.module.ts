import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetController } from './timesheet.controller';
import { TimesheetService } from './timesheet.service';
import { Timesheet, TimesheetSchema } from './timesheet.schema';    
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../auth/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Timesheet.name, schema: TimesheetSchema }, { name: User.name, schema: UserSchema }]), 
        AuthModule],
    controllers: [TimesheetController],
    providers: [TimesheetService],
})
export class TimesheetModule {}
