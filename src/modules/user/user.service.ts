import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { toObjectId } from 'src/shares/helpers/mongoose.helper';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const updatedFields: Partial<UpdateUserDto> = {};

    for (const [key, value] of Object.entries(updateUserDto)) {
      if (value !== undefined && value.trim() !== '') {
        updatedFields[key] = value;
      }
    }
    await this.userRepository.update(
      { _id: toObjectId(userId) },
      updatedFields,
    );
  }
  async findUserByAccountId(accountId: string) {
    const user = await this.userRepository.findOne({
      where: { accountId: toObjectId(accountId) },
    });
    return user;
  }
}
