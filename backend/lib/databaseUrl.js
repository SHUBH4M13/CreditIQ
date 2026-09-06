import "dotenv/config";

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const encode = (value) => encodeURIComponent(value ?? "");

export const databaseUrl = process.env.DATABASE_URL
    ?? `mysql://${encode(DB_USER)}:${encode(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${encode(DB_NAME)}`;

process.env.DATABASE_URL ??= databaseUrl;
