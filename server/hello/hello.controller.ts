import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {

  @Get()
  getAll(): any {
    return { hello: 'world' };
  }

}
