// sqlite3
// npm install sqlite3 --save  # node-sqlite3 依赖
// npm install sqlite --save  # 基于 node-sqlite3 的 Promise
// juejin.im/post/5bc48f17e51d450e3d2d3404
// www.cnblogs.com/laden666666/p/6942717.html

const sqlite3 = require('sqlite3').verbose();
const path = 'sqlite/mydatabase.db';

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    // 连接数据库
    const db = new sqlite3.Database(path, function(err) {
      if (err) reject(err);
    });
    // 查询所有
    db.all(sql, values, function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      // 关闭数据库
      db.close();
    });
  });
};

module.exports = {
  query
};
