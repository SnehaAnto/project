import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timesheet } from './timesheet.schema';
import { TimesheetDto } from '../dto/timesheet.dto';

@Injectable()
export class TimesheetService {
    constructor(@InjectModel(Timesheet.name) private timesheetModel: Model<Timesheet>) {}

    async create(timesheetDto: TimesheetDto): Promise<Timesheet> {
        const createdTimesheet = new this.timesheetModel(timesheetDto);
        return createdTimesheet.save();
    }

    async findAll(): Promise<Timesheet[]> {
        return this.timesheetModel.find().exec();
    }

    async delete(id: string): Promise<Timesheet> {
        const result = await this.timesheetModel.findByIdAndDelete(id).exec();
        return result;
    }
    
    async update(id: string, timesheetDto: TimesheetDto): Promise<Timesheet> {
        const result = await this.timesheetModel.findByIdAndUpdate(
            id, 
            timesheetDto,
            { new: true }
        ).exec();
        return result;
    }
}
