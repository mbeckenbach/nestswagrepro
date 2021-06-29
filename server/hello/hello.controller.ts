import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '../auth/auth.constants';

@Controller('hello')
export class HelloController {

  @AllowAnonymous()
  @Get()
  getAll(): any {
    console.log('Hello called');
    return { hello: 'world' };
  }

}
