import stylexPlugin from "@stylexswc/nextjs-plugin";
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

const nextConfig = {
  compiler: isProd
    ? {
        reactRemoveProperties: { properties: ["^data-testid$"] },
      }
    : {},
};

export default withStylex(nextConfig);
