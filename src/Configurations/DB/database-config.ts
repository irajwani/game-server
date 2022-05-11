import { ConfigModule, registerAs } from '@nestjs/config';

export default ConfigModule.forFeature(
  registerAs('db', () => ({
    pgHost: process.env.PG_HOST,
    pgPort: process.env.PG_PORT,
    pgUser: process.env.PG_USER,
    pgPassword: process.env.PG_PASSWORD,
    pgDb: process.env.PG_DB,
  })),
);
