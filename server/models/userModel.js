const { query } = require('@/utils/db');

class userModel {
  // 获取所有的用户信息
  async userAllInfo() {
    let sql = 'SELECT * FROM user_info';
    let dataList = await query(sql);
    return dataList;
  }
}

module.exports = new userModel();
