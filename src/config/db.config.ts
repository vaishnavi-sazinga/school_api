const dbConnectionConfig: any = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: Number(process.env.DB_MAX_POOL_CONNECTIONS),
        min: Number(process.env.DB_MIN_POOL_CONNECTIONS),
        acquire: Number(process.env.DB_CONNECTION_ACQUIRE_TIMEOUT),
        idle: Number(process.env.DB_CONNECTION_IDLE_TIMEOUT),
    },
};

Object.keys(dbConnectionConfig).forEach((key: string) => {
    if (dbConnectionConfig[key] === undefined) {
        throw Error(
            `Invalid dbConnectionConfig - ${JSON.stringify(dbConnectionConfig)}`
        );
    }
});

export default dbConnectionConfig;
