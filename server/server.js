const app = require('./src/api');

app.use(function (req, res, next) {
    next();
})

const port = process.env.port || 3000;

app.listen(port);

console.log("Start app in port " + port);