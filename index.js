var express = require('express');
let LineBot = require('./common/router/LineBot');
let UserRouter = require('./common/router/UserInfoRouter');
let UserUpdateRouter = require('./common/router/UserUpdateRouter');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));//在原有的基础上加上下面代码即可
app.use(bodyParser.json());

app.post('/', LineBot);
app.post('/userInfo', UserRouter);
app.post('/userUpdate', UserUpdateRouter);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});
