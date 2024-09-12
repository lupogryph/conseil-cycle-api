import { Controller, Get, Param } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Meeting } from './entities/meeting.entity';
import { MeetingDto } from './dto/meeting.dto';

@ApiBearerAuth()
@ApiTags('meeting')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingService: MeetingService) {}

  @ApiOkResponse({ type: MeetingDto, isArray: true })
  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @ApiOkResponse({ type: MeetingDto, isArray: true })
  @Get(':from/:to')
  findBetween(@Param('from') from: Date, @Param('to') to: Date) {
    return this.meetingService.findBetween(from, to);
  }
}
