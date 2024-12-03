import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timesheet } from './timesheet.schema';
import { TimesheetDto } from '../dto/timesheet.dto';
import { Task } from '../dto/user.dto'; 
import { User } from '../auth/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class TimesheetService {
    constructor(@InjectModel(Timesheet.name) private timesheetModel: Model<Timesheet>,
                @InjectModel(User.name) private userModel: Model<User>) {}

    async create(timesheetDto: TimesheetDto): Promise<Timesheet> {
        const createdTimesheet = new this.timesheetModel(timesheetDto);
        return createdTimesheet.save();
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Timesheet[]; total: number; page: number; lastPage: number }> {
        const skip = (page - 1) * limit;
        
        const [data, total] = await Promise.all([
            this.timesheetModel
                .find()
                .skip(skip)
                .limit(limit)
                .exec(),
            this.timesheetModel.countDocuments()
        ]);

        const lastPage = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            lastPage
        };
    }

    async delete(id: string): Promise<Timesheet> {
        const result = await this.timesheetModel.findByIdAndDelete(id, { new: true }).exec();
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

    async addTask(username: string, task: Task) {
        const taskWithId = {
            ...task,
            id: task.id || new mongoose.Types.ObjectId().toString()
        };

        const result = await this.userModel.findOneAndUpdate(
            { username: username },
            { $push: { tasks: taskWithId } },
            { new: true } 
        ).exec();
        return result?.tasks;
    }
    
    async getTask(username: string) {
        const result = await this.userModel.findOne(
            { username: username }
        ).exec();
        return result?.tasks?.filter(task => task.isActive) || [];
    }       
    
    async deleteTask(username: string, taskId: string) {
        const result = await this.userModel.findOneAndUpdate(
            { username: username, "tasks.id": taskId },
            { $set: { "tasks.$.isActive": false } },
            { new: true }
        ).exec();
        return result?.tasks;
    }
}
