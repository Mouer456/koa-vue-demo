const router = require('koa-router')();
const userController = require('@/controllers/userController');

// 用户模块
router.prefix('/user');
// router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/userinfo', userController.userInfo);
router.get('/userAllInfo', userController.userAllInfo); // mysql
router.get('/userAllInfo_sqlite', userController.userAllInfo_sqlite); // sqlite3
router.post('/upload/file', userController.uploadFile); // 上传文件/图片

// 接口格式定义
// router.prefix('/user');
// router.post('/add', ''); // 增加 /api/user/add
// router.post('/info', ''); // 查询单个用户信息 /api/user/info
// router.post('/list', ''); // 查询所有/分页查询 /api/user/list
// router.post('/update', ''); // 修改 /api/user/update
// router.post('/password/update', ''); // 修改密码 /api/user/password/update
// router.post('/delete', ''); // 删除 /api/user/delete

module.exports = router;
