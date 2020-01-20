/**
 * 异常处理
 */
const errorHandle = (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      // ctx.body = {
      //   code: err.status,
      //   msg: err.originalError ? err.originalError.message : err.message
      // };
      return ctx.sendError(
        err.status,
        err.originalError ? err.originalError.message : err.message
      );
    } else {
      throw err;
    }
  });
};

module.exports = errorHandle;
