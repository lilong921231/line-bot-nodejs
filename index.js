const express = require('express');
let LineBot = require('./common/router/LineBot');
let UserRouter = require('./common/router/UserInfoRouter');
let UserUpdateRouter = require('./common/router/UserUpdateRouter');
const bodyParser = require('body-parser');

const app = express();
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

// app.use(bodyParser.urlencoded({extended:true}));//在原有的基础上加上下面代码即可
// app.use(bodyParser.json());

app.post('/', LineBot);
app.post('/userInfo', UserRouter);
app.post('/userUpdate', UserUpdateRouter);

app.use(express.static('public'));

//express port:3000
const server = app.listen(process.env.PORT || 3000, function() {
    const port = server.address().port;
    console.log("App now running on port:", port);
});
