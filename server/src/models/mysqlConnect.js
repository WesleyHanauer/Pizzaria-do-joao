async function connect() {
    const mysql = require('mysql2/promise');
    if (global.connection && global.connection.state !== "disconnected") {
        return global.connection;
    }
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "bdpizzaria"
    });
    console.log("Conexão estabelecida");
    global.connection = connection;
    return connection;
}

async function query(sql) {
    const conn = await connect();
    const [rows] = await conn.query(sql);
    return rows;
}

module.exports = { query }