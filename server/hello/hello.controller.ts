import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {

  @Get()
  getAll(): any {
    console.log('Hello called');
    return { hello: 'world' };
  }

}
