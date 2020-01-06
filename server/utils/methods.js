const path = require('path');
const dayjs = require('dayjs'); // 时间和日期 依赖库

const rootPath = path.resolve(__dirname, './../../'); //代码文件的根路径

/**
 *  获取前端静态代码文件目录
 */
function webPath() {
  const webPath = path.join(rootPath, 'web');
  return webPath;
}
/**
 *  获取静态资源文件目录
 */
function publicPath() {
  const publicPath = path.join(rootPath, 'public');
  return publicPath;
}

/**
 * 空值判断
 * isEmpty()              //true
 * isEmpty([])            //true
 * isEmpty({})            //true
 * isEmpty(0)             //true
 * isEmpty(Number("abc")) //true
 * isEmpty("")            //true
 * isEmpty("   ")         //true
 * isEmpty(false)         //true
 * isEmpty(null)          //true
 * isEmpty(undefined)     //true
 */
function isEmpty(v) {
  switch (typeof v) {
    case 'undefined':
      return true;
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0)
        return true;
      break;
    case 'boolean':
      if (!v) return true;
      break;
    case 'number':
      if (0 === v || isNaN(v)) return true;
      break;
    case 'object':
      if (null === v || v.length === 0) return true;
      for (var i in v) {
        return false;
      }
      return true;
  }
  return false;
}

module.exports = {
  rootPath,
  webPath,
  publicPath,
  dayjs,
  isEmpty
};
