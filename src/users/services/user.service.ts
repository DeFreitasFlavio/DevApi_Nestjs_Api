import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createUserDto from '../dto/user.dto';
import loginUserDto from '../dto/login.dto';
import { User } from '../user.entity';
import * as  bcrypt from "bcrypt";
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneBy(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  findEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async getById(id: string): Promise<User> {
    if(!isUUID(id)) throw new BadRequestException('invalid id')
    const user = await this.usersRepository.findOneBy({ id });
    if(!user) {
      throw new NotFoundException('User not found')
    }
    return user;
  }

  async createUser(user: createUserDto) {
    const newUser = this.usersRepository.create({
      ...user, 
      password:  await bcrypt.hash(user.password, await bcrypt.genSalt(10)),
    });
    return this.usersRepository.save(newUser);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async validate({ email, password }: loginUserDto): Promise<createUserDto> {
    const user = await this.usersRepository.findOne({ where: { email }});
    const areEqual = await bcrypt.compare(password, user.password);
    if(!user) {
      throw new UnauthorizedException();
    }
    if (!areEqual) {
     throw console.warn("Wrong Password");
    }
    return user;
  }
}
