import { Controller, Post, Body, Get, Delete, Param, Put, Patch } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { Timesheet } from './timesheet.schema';

@Controller('timesheet')
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) {}

    @Post()
    async create(@Body() createTimesheetDto: Partial<Timesheet>): Promise<Timesheet> {
        return this.timesheetService.create(createTimesheetDto);
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
    async update(@Param("id") id, @Body() createTimesheetDto: Partial<Timesheet>): Promise<Timesheet> {
        return this.timesheetService.update(id, createTimesheetDto);
    }

    @Patch("/:id")
    async updatethis(@Param("id") id, @Body() createTimesheetDto: Partial<Timesheet>): Promise<Timesheet> {
        return this.timesheetService.updatethis(id, createTimesheetDto);
    }
}
