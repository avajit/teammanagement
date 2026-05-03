import { defineConfig, type PrismaConfig } from "prisma/config";
import "dotenv/config";

type PrismaConfigWithEarlyAccess = PrismaConfig & { earlyAccess?: boolean };

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
  migrate: {
    async adapter() {
      const { PrismaPg } = await import("@prisma/adapter-pg");
      return new PrismaPg({ connectionString: process.env.DATABASE_URL });
    },
  },
} as PrismaConfigWithEarlyAccess);
