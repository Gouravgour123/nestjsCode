import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
     constructor(private readonly userService : UserService){
        super();
     }
     validate(username : string, password : string): User{
        const user : User = this.userService.getUserByUserName(username);
        if(user === undefined) throw new UnauthorizedException();
        if(user != undefined && user.password == password){
         //   console.log("hello")
           return user;

        }
        else{
            throw new UnauthorizedException();
        }
     }
}
 