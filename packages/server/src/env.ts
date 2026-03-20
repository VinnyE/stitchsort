import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const envCandidates = [
  resolve(process.cwd(), ".env.local"),
  resolve(process.cwd(), ".env"),
  resolve(process.cwd(), "..", ".env.local"),
  resolve(process.cwd(), "..", ".env"),
  resolve(process.cwd(), "..", "..", ".env.local"),
  resolve(process.cwd(), "..", "..", ".env"),
];

for (const path of envCandidates) {
  if (existsSync(path)) {
    loadEnv({ path, override: false, quiet: true });
  }
}
