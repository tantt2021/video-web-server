const mysql = require("mysql2/promise");

async function createConnection() {
  return await mysql.createConnection({
    host: '1.12.240.146',
    user: 'tantt',
    password: '!Tan402010',
    database: 'videoWeb'
  });
}

export default createConnection;