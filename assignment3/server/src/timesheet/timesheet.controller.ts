import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.schema';
import { TimesheetDto } from '../dto/timesheet.dto';

@Controller('timesheet')
@UseGuards(AuthGuard)
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) {}

    @Post()
    async create(@Body() timesheetDto: TimesheetDto): Promise<Timesheet> {
        return this.timesheetService.create(timesheetDto);
    }

    @Get()
    async findAll(): Promise<Timesheet[]> {
        return this.timesheetService.findAll();
    }

    @Delete("/:id")
    async delete(@Param("id") id) {
        return this.timesheetService.delete(id);
    }

    @Put("/:id")
    async update(@Param("id") id, @Body() timesheetDto: TimesheetDto): Promise<Timesheet> {
        return this.timesheetService.update(id, timesheetDto);
    }
}
