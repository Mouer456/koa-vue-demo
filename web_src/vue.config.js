const flagProduction = process.env.VUE_APP_FLAG === 'production';
const flagTest = process.env.VUE_APP_FLAG === 'test';

module.exports = {
  publicPath: './',
  outputDir: '../web',
  productionSourceMap: !flagProduction, // 生产环境去掉map文件

  chainWebpack: config => {
    if (flagTest) {
      // 命令: npm run test 测试环境 + 包分析
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end();
    }
  },
  configureWebpack: {
    optimization: {
      // 根据需要为各应用分离代码块
      splitChunks: {}
    }
  }
};
