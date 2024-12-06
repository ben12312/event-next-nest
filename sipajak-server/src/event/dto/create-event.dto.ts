import {
    IsString,
} from 'class-validator';
// import { Timestamp } from 'typeorm';

export class CreateEventDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    date: Date;
}
