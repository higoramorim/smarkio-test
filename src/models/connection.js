const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'higoramorim',
  database: 'comments',
  port: '3306',
});