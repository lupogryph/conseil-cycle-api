import { Controller, Get, Param } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('meeting')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':from/:to')
  findAllAfterDate(@Param('from') from: Date, @Param('to') to: Date) {
    return this.meetingService.findBetweenDates(from, to);
  }
}
