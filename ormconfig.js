require('dotenv/config');

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [process.env.TYPEORM_ENTITIES],
    migrationsTableName: 'migrations',
    migrations: [process.env.TYPEORM_MIGRATIONS],
    cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    },
};
