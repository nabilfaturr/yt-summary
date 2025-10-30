import type { NextConfig } from "next";
import { config } from "dotenv";
import path from "path";

// load from the monorepo root env first
config({
  path: path.resolve(__dirname, "../../.env.local"),
});

// then load from the app specific env to override
config({
  path: path.resolve(__dirname, ".env.local"),
});

const nextConfig: NextConfig = {};

export default nextConfig;
