// DB Connection File

import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;  // Allow undefined initially
};

const options: any = {
  log: ["query"],
};

if (process.env.PRISMA_ACCELERATE_URL) {
  options.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
}

export const prisma = globalForPrisma.prisma || new PrismaClient(options);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}