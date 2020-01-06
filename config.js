module.exports = {
  // 服务端口
  port: 3000,
  // MySQL 数据库配置
  database: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test_db'
  },
  // SQLite 数据库路径配置
  SQLitePath: {
    mydatabase: 'sqlite/mydatabase.db'
  }
};
