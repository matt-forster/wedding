/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "cloudflare-pages",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  // colocation pattern
  ignoredRouteFiles: [
    "**/.*",
    "**/components/*",
    "**/util/*",
    "**/*.model.*",
    "**/*.repository.*",
    "**/*.test.*",
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "functions/[[path]].js",
  // publicPath: "/build/",
};
