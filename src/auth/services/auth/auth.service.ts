import { Injectable} from '@nestjs/common'
import { UsersService } from '../../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService, 
    private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<Omit<User, "password">> {
      const user = await this.userService.findOneBy(email);
      if (user && bcrypt.compareSync(pass, user.password)){
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

  async login(user: User) {
    const payload = { email: user.email, username: user.username, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
