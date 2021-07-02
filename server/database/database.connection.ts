import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { DB_ENTITIES } from './database.entities';

// TODO Change to env variables
export const DB_CONNECTION_OPTIONS: TypeOrmModuleOptions = {
  // See https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#mssql-connection-options
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'Meister07',
  database: 'devtest',
  entities: DB_ENTITIES,
  extra: {
    options: {
      // TODO: Should be true at azure
      encrypt: false,
      instanceName: 'SQLEXPRESS'
    },
  },
  synchronize: true,
};
