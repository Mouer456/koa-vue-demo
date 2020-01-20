// 参考:
// https://juejin.im/post/5d255d05518825424d656e11
// https://juejin.im/post/5cd11420f265da036d79d0f3

const Koa = require('koa'),
  json = require('koa-json'),
  onerror = require('koa-onerror'),
  bodyparser = require('koa-bodyparser'),
  koaLogger = require('koa-logger'),
  router = require('koa-router'),
  cors = require('koa2-cors'),
  requireDirectory = require('require-directory'), // 路由的自动加载
  moduleAlias = require('module-alias'), // 路径别名
  koaStatic = require('koa-static'),
  jwtKoa = require('koa-jwt'); // 用于路由权限控制
// const chalk = require('chalk'); // 修改控制台中字符串的样式

// 自定义中间件
const sendHandle = require('./middlewares/sendHandle.js'), // 统一返回 json 格式，中间件
  errorHandle = require('./middlewares/errorHandle.js'); // 验证token异常处理，如token过期、token错误

const app = new Koa();

// 路径别名
moduleAlias.addAliases({
  root: './../', // 项目根目录
  '@': __dirname // server 目录
});

/******************** 全局变量 start ********************/

const config = require('root/config'); // 配置文件
const methods = require('./utils/methods'); // 公共方法

global.$config = config; // console.log($config);
global.$mydatabase = config.SQLitePath.mydatabase; // 全局定于SQLite数据库路径：'sqlite/mydatabase.db'
global.$methods = methods; // 公共方法
global.dayjs = methods.dayjs; // dayjs 时间和日期 依赖库

global.logger = require('@/utils/log'); // log4js
// 示例：logger.info('Something important');

/******************** 全局变量 end ********************/

/******************** middlewares start ********************/
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
app.use(koaLogger());
// log => {
//   console.log(dayjs().format('YYYY-MM-DD HH:mm:ss.SSS') + log);
// };
app.use(koaStatic($methods.webPath())); // 静态资源 web ：存在前端页面代码
app.use(koaStatic($methods.publicPath())); // 静态资源 public ：存放资源文件

// koa-logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(
    `${ctx.method} ${ctx.url} - ${ms}ms - ${dayjs().format(
      'YYYY-MM-DD HH:mm:ss.SSS'
    )}`
  );
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.use(sendHandle()); // 统一返回 json 格式
app.use(errorHandle); // 验证token异常处理

/******************** middlewares end ********************/

/* 路由权限控制 */
app.use(
  jwtKoa({ secret: $config.secret }).unless({
    // 设置login、register接口，可以不需要认证访问
    path: [
      /^\/api\/user\/login/, // /^\/api\/user\/login/
      /^\/api\/user\/register/,
      /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
  })
);

/*
 * 路由1：router_views 不配置路由前缀
 */
const router_views = new router();
router_views.get('/index', function(ctx, next) {
  ctx.body = 'this is a home!';
});
app.use(router_views.routes(), router_views.allowedMethods());

// 或
// const user = require('./routes/user');
// app.use(user.routes(), user.allowedMethods());

/******************** 路由1: router_views end ********************/

/*
 * 路由2：router_api 配置路由前缀 api
 */
const router_api = router(); // api 根路由
router_api.prefix('/api'); // 配置路由前缀

// 在根路由中注册子路由

// a. 手动加载注册子路由
// const index = require('./routes/index');
// const user = require('./routes/user');
// router_api.use(index.routes(), index.allowedMethods());
// router_api.use(user.routes(), user.allowedMethods());

// 或采用 use 方式分别配置前缀
// const index = require('./routes/index');
// const index2 = require('./routes/index2');
// router_api.use('/api/v1', index.routes(), index.allowedMethods());
// router_api.use('/api/v2', index2.routes(), index2.allowedMethods());

// b. 自动加载注册子路由
const modules = requireDirectory(module, './routes', {
  visit: whenLoadModule
});
function whenLoadModule(obj) {
  if (obj instanceof router) {
    router_api.use(obj.routes(), obj.allowedMethods());
  }
}

app.use(router_api.routes(), router_api.allowedMethods()); // 在app中注册根路由

/******************** 路由2: router_api end ********************/

module.exports = app;
