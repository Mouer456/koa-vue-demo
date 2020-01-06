const db = require('@/utils/db');
const sqlite = require('@/utils/db-sqlite3');

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
    let dataList = await sqlite.all($mydatabase, sql);
    return dataList;
  }
}

module.exports = new userModel();
