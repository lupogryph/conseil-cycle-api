import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { Role } from 'src/auth/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  password?: string;

  @ApiProperty({ name: 'role', enum: Role })
  @IsOptional()
  role?: Role;
}
