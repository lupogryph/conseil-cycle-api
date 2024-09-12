import { IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/roles.enum';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @MaxLength(20)
  name: string;

  @ApiProperty({ name: 'role', enum: Role })
  role: Role;
}
