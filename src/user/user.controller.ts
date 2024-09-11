import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    delete createUserDto.role;
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  find(@Request() req) {
    return this.userService.findById(req.user.sub);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    delete updateUserDto.role;
    return this.userService.update(req.user.sub, updateUserDto);
  }

  @Delete()
  remove(@Request() req) {
    return this.userService.remove(req.user.sub);
  }
}
