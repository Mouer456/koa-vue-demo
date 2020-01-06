const db = require('@/utils/db');
const SQLite3 = require('@/utils/db-sqlite3');

class userModel {
  constructor() {
    this.myDatabase = new SQLite3($config.SQLitePath.mydatabase);
  }

  // 获取所有的用户信息 mysql
  async userAllInfo() {
    let sql = 'SELECT * FROM user_info';
    let dataList = await db.query(sql);
    return dataList;
  }

  // 获取所有的用户信息 sqlite3
  async userAllInfo_sqlite() {
    let sql = 'SELECT * FROM user_info';
    let dataList = this.myDatabase.all(sql);
    return dataList;
  }
}

module.exports = new userModel();
