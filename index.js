const express = require('express');
const LineBot = require('./common/router/LineBot');
const UserRouter = require('./common/router/UserInfoRouter');
const UserUpdateRouter = require('./common/router/UserUpdateRouter');
const bodyParser = require('body-parser');

const app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods","POST,GET");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/', LineBot);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/userInfo', UserRouter);
app.post('/userUpdate', UserUpdateRouter);

app.use(express.static('public'));

//express port:3000
const server = app.listen(process.env.PORT || 3000, function() {
    const port = server.address().port;
    console.log("App now running on port:", port);
});
