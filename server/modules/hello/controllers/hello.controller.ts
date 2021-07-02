import { Controller, Get, Request } from '@nestjs/common';
import { AllowAnonymous } from '../../auth/decorators/allow-anonymous.decorator';

@Controller('hello')
export class HelloController {

  @AllowAnonymous()
  @Get()
  getAll(@Request() req): any {
    console.log('Hello called');
    return { hello: 'world' };
  }

  @Get('todos')
  getTodos(): any {
    return ['Watch Movie', 'Take Health Test', 'Play Cricket'];
  }

}
