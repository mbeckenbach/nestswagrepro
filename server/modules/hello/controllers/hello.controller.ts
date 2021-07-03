import { Controller, Get, Request } from '@nestjs/common';

@Controller('hello')
export class HelloController {

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
