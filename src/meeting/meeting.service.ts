import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { Between, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private repository: Repository<Meeting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createMeetingDto: CreateMeetingDto) {
    const meeting = this.repository.create(createMeetingDto);
    meeting.createdBy = await this.userRepository.findOneBy({ id: userId });
    return this.repository.save(meeting);
  }

  findAll() {
    return this.repository.find({ order: { date: 'ASC' } });
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  findBetweenDates(from: Date, to: Date) {
    return this.repository.findBy({ date: Between(from, to) });
  }

  async update(userId: number, id: number, updateMeetingDto: UpdateMeetingDto) {
    const meeting = this.repository.create(updateMeetingDto);
    meeting.updatedBy = await this.userRepository.findOneBy({ id: userId });
    return this.repository.update(id, meeting);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
