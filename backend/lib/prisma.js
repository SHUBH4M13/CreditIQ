import { PrismaClient } from "@prisma/client";
import { databaseUrl } from "./databaseUrl.js";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    datasources: { db: { url: databaseUrl } }
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
