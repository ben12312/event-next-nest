import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
const HASHSALT = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = await bcrypt.hash(createUserDto.password, HASHSALT);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    this.userRepository.save(user);
    return {
      msg: 'Success',
      code: 200,
      data: user
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User>  {
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User>  {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number): Promise<{ affected?: number }>{
    return this.userRepository.delete(id);
  }

  async signIn(createUserDto: CreateUserDto) {
    let { username, password } = createUserDto;    
    let user = await this.userRepository.findOneBy({ username });
    if (user) {
      let hashCompare = await bcrypt.compare(password, user.password);
      if (hashCompare) {
        let loginUser = {
          id: user.id,
          username: user.username,
          token: ''
        }
        let token = await this.jwtService.sign(loginUser, {
          secret: process.env.JWT_SECRET || 'sipajak'
        });
        delete loginUser.id
        loginUser.token = token;
        return {
          msg: 'Success',
          code: 200,
          data: loginUser
        }
      } else {
        return { msg: 'Wrong Password or Username', code: 400, data: {} }
      }
    } else {
      return { msg: 'Wrong Password or Username', code: 400, data: {} }
    }
  }
}
