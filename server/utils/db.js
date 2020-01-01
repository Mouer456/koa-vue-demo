// 参考 https://chenshenhai.github.io/koa2-note/note/mysql/async.html

const mysql = require('mysql');
const config = require('./../../config');

const pool = mysql.createPool(config.database);

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (error, results) => {
          if (err) {
            reject(error);
          } else {
            resolve(results);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = {
  query
};
