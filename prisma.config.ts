import { config } from "dotenv"
import {defineConfig, env} from "prisma/config";

// Load .env.local first (higher priority), then .env
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
    schema:"prisma/schema.prisma",
    migrations: {
        path:"prisma/migrations"
    },
    datasource: {
    // Use direct connection for migrations (without -pooler)
    url: env("DIRECT_URL"),
  },
})