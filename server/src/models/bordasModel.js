const mysql = require('./mysqlConnect');

getBordas = async () => {
    sql = "SELECT * FROM bordas";
    return await mysql.query(sql)
}

module.exports = { getBordas }