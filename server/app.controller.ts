import { Controller, Post } from '@nestjs/common';
import { AuthService } from './modules/auth/services/auth.service';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(): Promise<any> {
    return { doo: 'bar' };//await this.authService.validateUser('naveen', '1234');
  }

}
