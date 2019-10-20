module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: []   // 这个 配置可以省略后缀名 如.js .vue等
      // 配置别名
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  }
};
