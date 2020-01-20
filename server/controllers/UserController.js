const userModel = require('@/models/userModel');
const { uploadFile } = require('@/utils/upload');

class userController {
  // 用户登录
  async login(ctx, next) {
    // 获取请求提交的数据
    const user = ctx.request.body;

    const name = user.name || '',
      pwd = user.pwd || '';

    console.log(name, pwd);

    // do something

    ctx.body = {
      status: true,
      token: '123'
    };
  }

  // 用户信息
  async userInfo(ctx, next) {
    // do something
    console.log(ctx);
    // 假设这是请求回来的数据
    let data = {
      name: 'jk',
      age: 25
    };
    ctx.body = {
      status: true,
      data
    };
  }

  // 获取所有的用户信息 mysql
  async userAllInfo(ctx, next) {
    let data = await userModel.userAllInfo();
    ctx.body = data;
  }

  // 获取所有的用户信息 sqlite3
  async userAllInfo_sqlite(ctx, next) {
    let data = await userModel.userAllInfo_sqlite();
    ctx.body = data;
  }

  //  上传文件/图片
  // https://chenshenhai.github.io/koa2-note/note/upload/simple.html
  async uploadFile(ctx, next) {
    var result = {
      errno: 0,
      errmsg: '操作成功'
    };

    // 上传文件事件
    var uploadResult = await uploadFile(ctx, {
      fileType: 'file'
    });

    if (uploadResult.status) {
      result = uploadResult;
    }

    ctx.body = result;
  }
}

module.exports = new userController();
