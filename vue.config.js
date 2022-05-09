const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    experiments: {
        topLevelAwait: true
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
});
