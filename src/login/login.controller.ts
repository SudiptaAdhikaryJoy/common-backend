import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-loginUser.dto';
import { UpdateLoginDto } from './dto/update-loginUser.dto';
import { Request, Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly LoginService: LoginService) {}

  @Post()
  async create(
    @Body() createLoginDto: CreateLoginDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    // return this.usersService.create(createUserDto);
    try {
      const result:any = await this.LoginService.create(createLoginDto);
      if (result.success) {
        return response.status(HttpStatus.OK).json({
          message: 'Login successful',
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
      } else {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          message: result.error,
        });
      }
      // return response.json(result);
    } catch (error) {
      console.error('Error during login creation:', error);
      if (error instanceof InternalServerErrorException) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An internal server error occurred',
        });
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message || 'An error occurred during login',
      });
    }
  }

  @Get()
  async findAll() {
    // return this.usersService.findAll();
    try {
      const data: any = await this.LoginService.findAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    try {
      const data: any = await this.LoginService.findOne(+id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateLoginDto) {
    try {
      const data: any = await this.LoginService.update(+id, updateUserDto);
      return { message: 'Updated successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data: any = await this.LoginService.remove(+id);
      return { message: 'Deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
