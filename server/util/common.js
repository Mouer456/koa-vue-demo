const path = require('path');

// 获取代码文件的根目录
function webPath() {
  const rootPath = path.resolve(__dirname, './../../'); //代码文件的根路径
  const webPath = path.join(rootPath, 'web');
  return webPath;
}
function publicPath() {
  const rootPath = path.resolve(__dirname, './../../'); //代码文件的根路径
  const publicPath = path.join(rootPath, 'public');
  return publicPath;
}

module.exports = {
  webPath,
  publicPath
};
