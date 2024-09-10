import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { MeetingsController } from './meetings.controller';
import { Meeting } from './entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  controllers: [MeetingController, MeetingsController],
  providers: [MeetingService],
  exports: [TypeOrmModule]
})
export class MeetingModule {}
