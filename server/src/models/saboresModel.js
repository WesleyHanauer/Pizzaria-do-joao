const mysql = require('./mysqlConnect');

getSabores = async () => {
    sql = 'SELECT * FROM sabores';
    return await mysql.query(sql);
}

module.exports = { getSabores }