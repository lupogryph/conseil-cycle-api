import { Controller, Get, Param } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':begin-date/:end-date')
  findAllAfterDate(
    @Param('begin-date') beginDate: string,
    @Param('end-date') endDate: string,
  ) {
    return this.meetingService.findAll();
  }
}
