const mysql = require('./mysqlConnect')
const jwt = require('jsonwebtoken');
const md5 = require('md5')

get = async () => {
    const users = await mysql.query("SELECT * FROM usuario");
    return users;
}

login = async (data) => {
    console.log(data);
    senhaN = data.senha
    //console.log(senhaN)
    senha = md5(senhaN.toString());
    //console.log(senha)
    sql = "SELECT id, nome, email, endereco FROM usuario WHERE email='"
        + data.email + "' and senha='" + senha + "'";
    console.log(sql);
    const users = await mysql.query(sql);
    result = null;
    if (users[0].id) {
        const id = users[0].id;
        var token = jwt.sign({ id }, 'Pizzaria', { expiresIn: 5000 });
        console.log("Fez login e gerou token!");
        result = { auth: true, token: token, user: users[0] }
    }
    return result;
}

logout = (token) => {
    console.log("Fez logout e cancelou o token!");
    res.clearCookie('Token');
    return { auth: false, token: null };
};

cadastro = async (data) => {
    console.log(data);
    senhaN = data.senha
    //console.log(senhaN)
    senha = md5(senhaN.toString());
    //console.log(senha)
    sql = "INSERT INTO usuario (nome, email, endereco, senha) VALUES ('" + data.nome + "', '"
        + data.email + "', '" + data.endereco + "', '" + senha + "')";
    console.log(sql);
    users = await mysql.query(sql);
    console.log(users)
    sqlDois = "SELECT * FROM usuario WHERE email='"
        + data.email + "' and senha='" + senha + "'";
    user = await mysql.query(sqlDois);
    result = null;
    if (user[0]) {
        const id = user[0].id;
        var token = jwt.sign({ id }, 'Pizzaria', { expiresIn: 5000 });
        console.log("Fez login e gerou token!");
        result = { auth: true, token: token, user: user[0] }
    }
    return result;
}

//função que verifica se o JWT é ok
verifyJWT = (token) => {
    if (!token) {
        resp = { auth: false, message: 'Token não informado.' };
    }
    jwt.verify(token, 'Pizzaria', function (err, decoded) {
        console.log(token)
        if (err) {
            resp = { auth: false, message: 'Token inválido.' };
        }
        if (decoded) {
            req.decoded = decoded
            console.log(req.decoded)
            resp = { auth: true, idUser: req.decoded };
        }
    });
    return resp;
}

module.exports = { get, login, logout, cadastro, verifyJWT };