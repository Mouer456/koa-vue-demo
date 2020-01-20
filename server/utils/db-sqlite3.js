const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

/**
 * sqlite3 Promise 封装: 每次请求都会关闭连接
 * 参数：
 *    dbFilePath：sqlite3文件路径; sql:SQL语句; params：参数
 * 示例：
 *    const SQLite = require('@/utils/db-sqlite3');
 *    let dataList = await SQLite.all($mydatabase , sql);
 * 或：
 *    await sqlite
 *      .all($mydatabase, sql)
 *      .then(res => {
 *          console.log(res);
 *       })
 *      .catch(err => {
 *          console.log(err);
 *       });
 */

const SQLite = {
  // 打开数据库或者创建
  database: function(dbFilePath) {
    return new sqlite3.Database(dbFilePath, err => {
      if (err) {
        console.log('Could not connect to database:', dbFilePath, err);
        reject(err);
      }
      // console.log('Connected to database');
    });
  },
  // 关闭数据库
  close: function(db) {
    db.close(err => {
      if (err) {
        console.log('Could not close to database:', dbFilePath, err);
        // reject(err);
      }
      // console.log('Closed to database');
    });
  },
  // 执行 DDL 和 DML 语句
  // 如建表、删表，插入、删除、更新行数据等
  run: function(dbFilePath, sql, params = []) {
    let db = this.database(dbFilePath);
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        this.close(db);
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  },
  // 查询一条数据
  get: function(dbFilePath, sql, params = []) {
    let db = this.database(dbFilePath);
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, result) => {
        this.close(db);
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  // 查询所有数据
  all(dbFilePath, sql, params = []) {
    let db = this.database(dbFilePath);
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        this.close(db);
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
};

module.exports = SQLite;
