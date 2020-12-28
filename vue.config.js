function setProxy() {
  const proxyObj = {};
  JSON.parse(process.env.VUE_APP_PROXY).forEach(([key, target]) => {
    proxyObj[key] = {
      target
    };
  });
  return proxyObj;
}
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: !process.env.VUE_APP_USE_MOCK && setProxy()
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });
    config
      .plugin("purge-icons-webpack-plugin")
      .use(require("purge-icons-webpack-plugin").PurgeIcons);
  }
};
