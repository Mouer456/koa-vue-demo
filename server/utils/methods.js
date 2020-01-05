const path = require('path');

const rootPath = path.resolve(__dirname, './../../'); //代码文件的根路径

// 获取代码文件的根目录
function webPath() {
  const webPath = path.join(rootPath, 'web');
  return webPath;
}

function publicPath() {
  const publicPath = path.join(rootPath, 'public');
  return publicPath;
}

module.exports = {
  rootPath,
  webPath,
  publicPath
};
