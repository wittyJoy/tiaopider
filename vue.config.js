const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // 所以这里假设你有 `assets/css/style.scss` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import "@/assets/css/variables.scss";`,
      },
    },
  },
  // 公共路径
  publicPath: './',
  devServer: {
    https: false, // https:{type:Boolean}
    host: 'localhost',
    port: 2020, // 端口号
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    // -----------------------------
    // 配置跨域代理
    proxy: {
      '/api': {
        // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
        target: `http://www.tiaopider.com:3000`,
        // 是否改变域名
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
          ['^/api']: '',
        },
      },
    },
    // ------------------------------
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg'); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    // svgRule.exclude.add(resolve("src/icons")).end()
    const iconRule = config.module.rule('icons');
    iconRule
      .test(/\.svg$/)
      .include.add(require('path').resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
    // config.plugin("html").tap((args) => {
    //   args[0].title = "扫码点灯"
    //   return args
    // })
  },
};
