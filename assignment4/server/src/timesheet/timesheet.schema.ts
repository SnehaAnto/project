import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Timesheet extends Document {
    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    project: string;

    @Prop({ required: true, min: 0, max: 8 })
    hours: number;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    userId: string;
}

export const TimesheetSchema = SchemaFactory.createForClass(Timesheet);

