// 参考 https://juejin.im/post/5d255d05518825424d656e11

const Koa = require('koa');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('koa-router');
const cors = require('koa2-cors');
const requireDirectory = require('require-directory'); // 路由的自动加载
const moduleAlias = require('module-alias'); // 路径别名
const koaStatic = require('koa-static');
// const chalk = require('chalk'); // 修改控制台中字符串的样式

const app = new Koa();

// 路径别名
moduleAlias.addAliases({
  root: './../', // 项目根目录
  '@': __dirname // server 目录
});

const config = require('root/config'); // 配置文件
const methods = require('@/utils/methods'); // 公共方法

// 定义为全局变量
global.$config = config; // console.log($config);
global.$methods = methods;
global.$dayjs = methods.dayjs; // dayjs 时间和日期 依赖库

// error handler
onerror(app);

// middlewares
app.use(cors()); // 跨域
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
// log => {
//   console.log(dayjs().format('YYYY-MM-DD HH:mm:ss.SSS') + log);
// };
app.use(koaStatic($methods.webPath())); // 静态资源 web ：存在前端页面代码
app.use(koaStatic($methods.publicPath())); // 静态资源 public ：存放资源文件

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(
    `${ctx.method} ${ctx.url} - ${ms}ms - ${$dayjs().format(
      'YYYY-MM-DD HH:mm:ss.SSS'
    )}`
  );
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// routes
// 1 配置根路由

const router_root = router();
router_root.prefix('/api'); // 根路由中增加前缀

// 在根路由中注册子路由

// 1.1 手动加载路由
// const index = require('./routes/index'); // 手动加载路由
// const user = require('./routes/user');
// router_root.use(index.routes(), index.allowedMethods());
// router_root.use(user.routes(), user.allowedMethods());

// 1.2 自动加载路由
const modules = requireDirectory(module, './routes', {
  visit: whenLoadModule
});
function whenLoadModule(obj) {
  if (obj instanceof router) {
    router_root.use(obj.routes(), obj.allowedMethods());
  }
}

// 在app中注册根路由
app.use(router_root.routes(), router_root.allowedMethods());

// 2. 不配置根路由
// app.use(index.routes(), index.allowedMethods());
// app.use(user.routes(), user.allowedMethods());

module.exports = app;
