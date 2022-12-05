const { verifyJWT } = require('../controllers/userController');
const mysql = require('./mysqlConnect');
const userModel = require('./userModel');

getPedidos = async () => {
    sql = "SELECT pe.id, u.nome, b.tipo as borda, m.tipo as massa, u.endereco, st.tipo as status FROM pedidos pe INNER JOIN usuario u ON u.id = pe.cliente_id INNER JOIN pizzas p ON p.id = pe.pizza_id INNER JOIN bordas b ON b.id = p.borda_id INNER JOIN massas m ON m.id = p.massa_id INNER JOIN status st ON st.id = pe.status_id";
    pedido = await mysql.query(sql);
    sqlDois = "SELECT ps.pizza_id, s.nome FROM sabores s INNER JOIN pizza_sabor ps ON s.id = ps.sabor_id INNER JOIN pizzas p ON ps.pizza_id = p.id;"
    sabores = await mysql.query(sqlDois);
    result = { pedido, sabores };
    return result;
}

postPedido3 = async (data) => {
    sqlSaborUm = "SELECT id FROM sabores WHERE nome like '" + data.sabores[0] + "';";
    saborUm = await mysql.query(sqlSaborUm);
    console.log(saborUm[0]['id'])
    sqlSaborDois = "SELECT id FROM sabores WHERE nome like '" + data.sabores[1] + "';";
    saborDois = await mysql.query(sqlSaborDois);
    sqlSaborTres = "SELECT id FROM sabores WHERE nome like '" + data.sabores[2] + "';";
    saborTres = await mysql.query(sqlSaborTres);
    sqlMassa = "SELECT id FROM massas WHERE tipo like '" + data.massa + "';";
    massa = await mysql.query(sqlMassa);
    sqlBorda = "SELECT id FROM bordas WHERE tipo like '" + data.borda + "';";
    borda = await mysql.query(sqlBorda);
    sql = "INSERT INTO pizzas (massa_id, borda_id) VALUES (" + massa[0]['id'] + ", " + borda[0]['id'] + ");"
    pizza = await mysql.query(sql);
    idsql = "SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE  table_name = 'pizzas' AND    table_schema = 'bdpizzaria';"
    idAuto = await mysql.query(idsql);
    idPizza = idAuto[0]['auto'] - 1;
    console.log(idPizza);
    sqlDois = "INSERT INTO pizza_sabor (pizza_id, sabor_id) VALUES (" + idPizza + ", " + saborUm[0]['id'] + "), (" + idPizza + ", " + saborDois[0]['id'] + "), (" + idPizza + ", " + saborTres[0]['id'] + ");";
    sabor = await mysql.query(sqlDois);
    sqlTres = "INSERT INTO pedidos (pizza_id, status_id, cliente_id) VALUES (" + idPizza + ", 1, " + data.user + ");";
    pedido = await mysql.query(sqlTres);
    result = { pizza, sabor, pedido };
    return result;
}

postPedido2 = async (data) => {
    sqlSaborUm = "SELECT id FROM sabores WHERE nome like '" + data.sabores[0] + "';";
    saborUm = await mysql.query(sqlSaborUm);
    console.log(saborUm[0]['id'])
    sqlSaborDois = "SELECT id FROM sabores WHERE nome like '" + data.sabores[1] + "';";
    saborDois = await mysql.query(sqlSaborDois);
    sqlMassa = "SELECT id FROM massas WHERE tipo like '" + data.massa + "';";
    massa = await mysql.query(sqlMassa);
    sqlBorda = "SELECT id FROM bordas WHERE tipo like '" + data.borda + "';";
    borda = await mysql.query(sqlBorda);
    sql = "INSERT INTO pizzas (massa_id, borda_id) VALUES (" + massa[0]['id'] + ", " + borda[0]['id'] + ");"
    pizza = await mysql.query(sql);
    idsql = "SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE  table_name = 'pizzas' AND    table_schema = 'bdpizzaria';"
    idAuto = await mysql.query(idsql);
    idPizza = idAuto[0]['auto'] - 1;
    console.log(idPizza);
    sqlDois = "INSERT INTO pizza_sabor (pizza_id, sabor_id) VALUES (" + idPizza + ", " + saborUm[0]['id'] + "), (" + idPizza + ", " + saborDois[0]['id'] + ");";
    sabor = await mysql.query(sqlDois);
    sqlTres = "INSERT INTO pedidos (pizza_id, status_id, cliente_id) VALUES (" + idPizza + ", 1, " + data.user + ");";
    pedido = await mysql.query(sqlTres);
    result = { pizza, sabor, pedido };
    return result;
}

postPedido1 = async (data) => {
    sqlSaborUm = "SELECT id FROM sabores WHERE nome like '" + data.sabores[0] + "';";
    saborUm = await mysql.query(sqlSaborUm);
    console.log(saborUm[0]['id'])
    sqlMassa = "SELECT id FROM massas WHERE tipo like '" + data.massa + "';";
    massa = await mysql.query(sqlMassa);
    sqlBorda = "SELECT id FROM bordas WHERE tipo like '" + data.borda + "';";
    borda = await mysql.query(sqlBorda);
    sql = "INSERT INTO pizzas (massa_id, borda_id) VALUES (" + massa[0]['id'] + ", " + borda[0]['id'] + ");"
    pizza = await mysql.query(sql);
    idsql = "SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE  table_name = 'pizzas' AND    table_schema = 'bdpizzaria';"
    idAuto = await mysql.query(idsql);
    idPizza = idAuto[0]['auto'] - 1;
    console.log(idPizza);
    sqlDois = "INSERT INTO pizza_sabor (pizza_id, sabor_id) VALUES (" + idPizza + ", " + saborUm[0]['id'] + ");";
    sabor = await mysql.query(sqlDois);
    sqlTres = "INSERT INTO pedidos (pizza_id, status_id, cliente_id) VALUES (" + idPizza + ", 1, " + data.user + ");";
    pedido = await mysql.query(sqlTres);
    result = { pizza, sabor, pedido };
    return result;
}

mudarStatus = async (data) => {
    novoStatus = data.id + 1;
    sql = "UPDATE pedidos SET status_id = " + novoStatus + " WHERE id = " + data.pedido;
    atualizado = await mysql.query(sql);
    sqlDois = "SELECT * FROM status WHERE id = " + novoStatus;
    statusA = await mysql.query(sqlDois)
    return { atualizado, statusA }
}

excluirPedido = async (data) => {
    sqlPizza = "SELECT * FROM pedidos WHERE id = " + data;
    idPizza = await mysql.query(sqlPizza);
    sql = "DELETE FROM pedidos WHERE id = " + data;
    pedido = await mysql.query(sql);
    sqlDois = "DELETE FROM pizza_sabor WHERE pizza_id = " + idPizza[0]['pizza_id'];
    sabor = await mysql.query(sqlDois);
    sqlTres = "DELETE FROM pizzas WHERE id = " + idPizza[0]['pizza_id'];
    pizza = await mysql.query(sqlTres);
    return { idPizza, pedido, sabor, pizza };
}

module.exports = { getPedidos, postPedido3, postPedido2, postPedido1, mudarStatus, excluirPedido }