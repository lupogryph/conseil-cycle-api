import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/auth/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  name: string;

  @ApiProperty({ name: 'role', enum: Role })
  @IsOptional()
  role: Role;
}
