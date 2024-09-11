import { Controller, Get, Param } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':beginDate/:endDate')
  findAllAfterDate(
    @Param('beginDate') beginDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.meetingService.findAll();
  }
}
