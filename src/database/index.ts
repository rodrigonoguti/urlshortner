import { createConnection } from "typeorm";

export default createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  migrations: [
    "./src/database/migrations/**.ts"
  ],
  entities: [
    "./src/models/**.ts"
  ],
  cli: {
    "migrationsDir": "./src/database/migrations"
  }
});