const mysql = require('mysql');
const config = require('./../../config');

const pool = mysql.createPool(config.database);

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(rows);
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
