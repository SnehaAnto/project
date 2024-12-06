import { Injectable, NotFoundException } from '@nestjs/common';
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

    async create(timesheetDto: TimesheetDto, username: string): Promise<Timesheet> {

        const newTimesheet = new this.timesheetModel({
            ...timesheetDto,
            userId: username
        });

        return newTimesheet.save();
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: Timesheet[]; total: number; page: number; lastPage: number }> {
        const skip = (page - 1) * limit;
        const total = await this.timesheetModel.countDocuments({ deletedAt: null });
        
        const data = await this.timesheetModel
            .find({ deletedAt: null })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .exec();

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
            isActive: true,
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

    async findDeleted() {
        return this.timesheetModel.find({ 
            deletedAt: { $ne: null } 
        }).exec();
    }

    async findUserEntries(
        username: string,
        page: number = 1,
        limit: number = 10
    ): Promise<{ data: Timesheet[]; total: number; page: number; lastPage: number }> {
        const skip = (page - 1) * limit;
        
        const user = await this.userModel.findOne({ username: username });
        if (!user) {
            throw new NotFoundException(`User ${username} not found`);
        }
        
        const [entries, total] = await Promise.all([
            this.timesheetModel
                .find({ userId: username, deletedAt: null })
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.timesheetModel.countDocuments({ userId: username, deletedAt: null })
        ]);

        const lastPage = Math.ceil(total / limit);

        return {
            data: entries,
            total,
            page,
            lastPage
        };
    }
}
