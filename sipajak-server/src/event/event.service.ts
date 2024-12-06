import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
  ) {}

  create(createEventDto: CreateEventDto) {
    const event: Event = new Event();
    event.title = createEventDto.title;
    event.description = createEventDto.description;
    event.date = createEventDto.date;
    return this.eventRepository.save(event);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    const event: Event = new Event();
    event.title = updateEventDto.title;
    event.description = updateEventDto.description;
    event.date = updateEventDto.date;
    event.id = id;
    return this.eventRepository.save(event);
  }

  remove(id: number) {
    return this.eventRepository.delete(id);
  }
}
