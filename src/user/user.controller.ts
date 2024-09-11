import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findById(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    delete updateUserDto.role;
    return this.userService.update(req.user.sub, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateAdmin(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    delete updateUserDto.role;
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
