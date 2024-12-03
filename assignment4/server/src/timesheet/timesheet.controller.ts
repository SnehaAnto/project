import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.schema';
import { TimesheetDto } from '../dto/timesheet.dto';
import { Task } from '../dto/user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('timesheet')
@UseGuards(AuthGuard, RolesGuard)
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) {}

    @Post()
    async create(@Body() timesheetDto: TimesheetDto): Promise<Timesheet> {
        return this.timesheetService.create(timesheetDto);
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<{ data: Timesheet[]; total: number; page: number; lastPage: number }> {
        return this.timesheetService.findAll(page, limit);
    }

    @Delete("/:id")
    async delete(@Param("id") id) {
        return this.timesheetService.delete(id);
    }

    @Put("/:id")
    async update(@Param("id") id, @Body() timesheetDto: TimesheetDto): Promise<Timesheet> {
        return this.timesheetService.update(id, timesheetDto);
    }

    @Roles(Role.HR)
    @Post("/:id/task")
    async addTask(@Param("id") id, @Body() task: Task){
        return this.timesheetService.addTask(id, task);
    }

    @Get("/:id/tasks")
    async getTask(@Param("id") id) {
        return this.timesheetService.getTask(id);
    }

    
    @Delete("/:id/task/:taskId")
    async deleteTask(@Param("id") id, @Param("taskId") taskId) {
        return this.timesheetService.deleteTask(id, taskId);
    }
}
