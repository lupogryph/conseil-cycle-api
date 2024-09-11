import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
