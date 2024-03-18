import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  User: any;

  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>){
}
      
 


  async registerUser(userData: Partial<User>): Promise<User> {
    const { email, password } = userData;
    try {
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({ ...userData, password: hashedPassword });
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(error.message);
    }
  }


async findByEmail(email:string): Promise<User> {
  return await this.userRepository.findOneBy({email})
}
async login(email: string , password: string): Promise<User> {
  const user = await this.findByEmail(email);
  if(!user){
    throw new NotFoundException('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      throw new UnauthorizedException('Invalid credentials');
    }
  return user;
}





async resetPassword(email: string, newPassword: string): Promise<User> {
  const user = await this.findByEmail(email);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  
  return await this.userRepository.save(user);
}


  // addUser(createUserDto: CreateUserDto) : Promise<User> {
  //   let user : User = new User();
  //   user.id =createUserDto.id;
  //   user.firstName =createUserDto.firstName;
  //   user.lastName = createUserDto.lastName;
  //   user.age = createUserDto.age;
  //   return this.userRepository.save(user);
  // }

  // findAll():Promise<User[]>  {
  //   return this.userRepository.find();
  // } 

  // findOne(id: number   ) {
  //   console.log('id', id)
  //   return this.userRepository.findOneBy({id});
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   let user : User = new User();
  //   user.firstName =updateUserDto.firstName;
  //   user.lastName = updateUserDto.lastName;
  //   user.age = updateUserDto.age;
  //   user.id = id;
  //   return this.userRepository.save(user);
  // }

  // remove(id: number) {
  //   return this.userRepository.delete(id);
  // }


 
  getUserByUserName(userName : string ):User{
    return this.User.find((user:User)=> user.username === userName);
}
}
