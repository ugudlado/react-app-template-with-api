const rootDir = process.env.NODE_ENV === 'DEV' ? 'src' : 'build'

const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  schema: 'public',
  synchronize: false,
  logging: process.env.ENABLE_CONSOLE_LOGGING === 'true',
  entities: [rootDir + '/data/models/**/*.{js,ts}'],
  migrations: [rootDir + '/data/migration/**/*.{js,ts}'],
  subscribers: [rootDir + '/data/subscribers/**/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/data/models',
    migrationsDir: 'src/data/migration',
    subscribersDir: 'src/data/subscribers',
  },
  migrationsRun: true,
  dropSchema: false,
}

module.exports = config
