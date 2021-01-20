module.exports = {
	// 公共路径
	publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
	devServer: {
		https: false, // https:{type:Boolean}
		host: "localhost",
		port: 2020, // 端口号
		open: false, // 配置自动启动浏览器
		hotOnly: true, // 热更新
		overlay: { // 让浏览器 overlay 同时显示警告和错误
			warnings: true,
			errors: true
		},
		// -----------------------------
		// 配置跨域代理
		proxy: {
			'/api': {
        // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
				target: `https://hrdev.gdhchina.com/api`,
				// 是否改变域名
				changeOrigin: true,
				// 路径重写
				pathRewrite: {
					// 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
					['^/api']: ''
				}
			}
		},
		// ------------------------------
  }
}