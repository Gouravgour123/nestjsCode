import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    id: number;
    username:string;
    email:string;
    password:string;
    mobile: string;
    city: string;
    state: string;
    profilepic: string;
}
