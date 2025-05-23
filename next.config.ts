import stylexPlugin from "@stylexswc/nextjs-plugin";
import { NextConfig } from "next";
import path from "path";

const rootDir = __dirname;

const isProd = process.env.NODE_ENV === "production";

const withStylex = stylexPlugin({
  rsOptions: {
    aliases: {
      "@/*": [path.join(rootDir, "*")],
    },
    unstable_moduleResolution: {
      type: "commonJS",
      rootDir,
    },
  },
});

const nextConfig: NextConfig = {
  compiler: isProd
    ? {
        reactRemoveProperties: { properties: ["^data-testid$"] },
      }
    : {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default withStylex(nextConfig);
