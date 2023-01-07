import { Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  UsePipes, 
  ValidationPipe,
  UseGuards,
  Request,
  ValidationError,
} from '@nestjs/common';
import loginUserDto from '../dto/login.dto';
import createUserDto from '../dto/user.dto';
import { UsersService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { AuthService } from '../../auth/services/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guards';
import { ValidatorOptions } from 'class-validator';

@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private UsersService: UsersService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @UsePipes(ValidationPipe)
  GetfindAll() {
    return this.UsersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  findMe(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.UsersService.getById(id);
  }

  @Post("auth/sign-up")
  @UsePipes(ValidationPipe)
  async PostCreateUser(@Body() createUserDto: createUserDto) {
    return this.UsersService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Body() body: loginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }
}

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

