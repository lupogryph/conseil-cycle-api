import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'node:crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hashPassword(createUserDto.password);
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  hashPassword(password: string) {
    const hash = crypto.scryptSync(password, process.env.JWT_SALT, 12);
    if (hash == null) {
      throw new InternalServerErrorException();
    }
    return hash.toString('hex');
  }

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password != null) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
