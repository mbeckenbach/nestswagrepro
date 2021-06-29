import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [
    // Makes service visible to other modules
    UsersService
  ]
})
export class UsersModule {}
