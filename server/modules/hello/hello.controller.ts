import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('hello')
export class HelloController {

  @Get()
  getAll(): any {
    console.log('Hello called');
    return { hello: 'world' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('todos')
  getTodos(): any {
    return ['Watch Movie', 'Take Health Test', 'Play Cricket'];
  }

}
