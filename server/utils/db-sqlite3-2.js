const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

/**
 * sqlite3 Promise 封装: 不关闭连接：适合客户端本地使用
 * 参数：
 *    dbFilePath：sqlite3文件路径; sql:SQL语句; params：参数
 * 示例：
 *    const SQLite = require('@/utils/db-sqlite3');
 *    const myDatabase = new SQLite($mydatabase);
 *    let dataList = myDatabase.all(sql);
 * 参考：
 * https://www.oschina.net/translate/a-sqlite-tutorial-with-node-js?cmp
 * https://juejin.im/post/5bc48f17e51d450e3d2d3404
 * https://www.cnblogs.com/laden666666/p/6942717.html
 * https://www.jianshu.com/p/323e2d9827e9
 */

class SQLite {
  // 打开数据库
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, err => {
      if (err) {
        console.log('Could not connect to database:', dbFilePath, err);
        reject(err);
      }
      console.log('Connected to database');
    });
  }
  // 关闭数据库
  close() {
    this.db.close();
  }
  // 执行 DDL 和 DML 语句
  // 如建表、删表，插入、删除、更新行数据等
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }
  // 查询一条数据
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  // 查询所有数据
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = SQLite;

// module.exports = {
//   SQLite3,
//   myDatabase: new SqlLite(global.myDatabase)
// };

// 建库命令
//  const mydatabase2 = new SqlLite('数据库路径');
