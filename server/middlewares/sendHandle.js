/**
 * 返回 json 数据格式封装
 * 参考：https://github.com/lin-xin/blog/blob/master/jwt-demo/server/middlewares/sendHandle.js
 * 示例：
 * return ctx.send({"token":"123456"},"登录成功");
 * return ctx.sendError(101,"登录失败");
 */

const sendHandle = () => {
  // 处理请求成功方法
  const render = ctx => {
    return (data, msg = '请求成功') => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        code: 0,
        msg,
        data
      };
    };
  };

  // 处理请求失败方法
  const renderError = ctx => {
    return (code, msg = '请求失败') => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        code, // 最好 int
        msg
        // data: ''
      };
    };
  };

  return async (ctx, next) => {
    ctx.send = render(ctx);
    ctx.sendError = renderError(ctx);
    await next();
  };
};

module.exports = sendHandle;
