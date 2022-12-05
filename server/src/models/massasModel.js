const mysql = require('./mysqlConnect');

getMassas = async () => {
    sql = "SELECT * FROM massas";
    return await mysql.query(sql)
}

module.exports = { getMassas }