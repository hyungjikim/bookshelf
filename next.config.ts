import stylexPlugin from "@stylexswc/nextjs-plugin";
import path from "path";

const rootDir = __dirname;

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

const nextConfig = {};

export default withStylex(nextConfig);
