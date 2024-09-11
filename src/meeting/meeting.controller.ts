import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('meeting')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  create(@Request() req, @Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingService.create(req.user.sub, createMeetingDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meetingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Request() req, 
    @Param('id') id: number, 
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return this.meetingService.update(req.user.sub, id, updateMeetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.meetingService.remove(id);
  }
}
