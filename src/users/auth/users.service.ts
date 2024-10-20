import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './register.dto';
import { LoginUserDto } from './login.dto'; // Nhập DTO đăng nhập
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema'; // Giả định bạn đã có schema cho User

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && user.password === password) {
      return user; // Nếu tên đăng nhập và mật khẩu đúng, trả về thông tin người dùng
    }
    return null; // Nếu sai, trả về null
  }

  async getAllUsers(): Promise<any> {
    return this.userModel.find().exec();
  }
}
