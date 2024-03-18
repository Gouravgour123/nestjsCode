import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}



  // @Post('register')
  // @UseInterceptors(FileInterceptor('profilepic', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, cb) => {
  //       cb(null, `${Date.now()}-${file.originalname}`);
  //     },
  //   }),
  // }))
  // async register(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   try {
  //     const profilepic = file ? file.path : ''; // Adjust as per your file storage setup

  //     const newUser = await this.userService.register(email, password, profilepic);
  //     return { success: true, message: 'User registered successfully', data: newUser };
  //   } catch (error) {
  //     return { success: false, message: error.message };
  //   }
  // }



  @Post('register')
// @UseGuards(AuthGuard("jwt"))
  async registerUser(@Body() createUserDto: CreateUserDto, @Res() res, @Req() req): Promise<any> {
    try {
      const newUser = await this.userService.registerUser(createUserDto);
      return res.status(201).json({ success: true, message: 'User registered successfully', data: newUser });
    } 
    catch (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
    // return this.authService.generateToken(req.user);

  }

@Post('login')
async login(@Body('email') email: string, @Body('password') password: string, @Res() res) {
  try{
     const user = await this.userService.login(email,password)
     return res.status(404).json({success:true, message: "login succesfully",user});
  }
  catch(error){
    return res.status(404).json({ success: false, message: error.message });
  }
}


@Post('reset-password')
@UseGuards(AuthGuard("jwt"))
async resetPassword(@Body('email') email: string, @Body('newPassword') newPassword: string, @Res() res) {
  try {
    await this.userService.resetPassword(email, newPassword);
    return res.status(201).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {    
      return res.status(404).json({ success: false, message: error.message });

  }
}




//   @Get()
//   findAll() {
//     return this.userService.findAll();
//   }

// @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.userService.findOne(id);
//   }

//   @Post('register')
//   register(@Body() createUserDto: CreateUserDto) {
//     return this.userService.addUser(createUserDto);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.userService.update(+id, updateUserDto);
//   }

// @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userService.remove(+id);
//   }

}
