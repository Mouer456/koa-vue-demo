const db = require('@/utils/db');
const SqlLite = require('@/utils/db-sqlite3');

const mydatabasePath = global.config.SQLitePath.mydatabase;
const myDatabase = new SqlLite(mydatabasePath);

class userModel {
  // 获取所有的用户信息 mysql
  async userAllInfo() {
    let sql = 'SELECT * FROM user_info';
    let dataList = await db.query(sql);
    return dataList;
  }

  // 获取所有的用户信息 sqlite3
  async userAllInfo_sqlite() {
    let sql = 'SELECT * FROM user_info';
    let dataList = await myDatabase.all(sql);
    return dataList;
  }
}

module.exports = new userModel();
