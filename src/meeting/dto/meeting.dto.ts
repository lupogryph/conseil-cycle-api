import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

export class MeetingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  location: string;

  @ApiProperty()
  createdBy: UserDto;

  @ApiProperty()
  updatedBy: UserDto;
}
