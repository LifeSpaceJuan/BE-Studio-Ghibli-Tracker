import { Injectable } from '@nestjs/common';
import { UsersService } from './../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, createAt, updateAt, ...rta } = user;
        return rta;
      }
    }
    return null;
  }
}
