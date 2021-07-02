import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { DB_ENTITIES } from './database.entities';

const DB_SERVICES = [
  UsersService
];

@Module({
  imports: [
    TypeOrmModule.forFeature(DB_ENTITIES)
  ],
  providers: [
    ...DB_SERVICES,
  ],
  exports: [
    ...DB_SERVICES,
  ],
})
export class DatabaseModule {
}
