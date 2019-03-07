var express = require('express');
let LineBot = require('./common/router/LineBot');
let UserRouter = require('./common/router/UserInfoRouter');
const app = express();


app.post('/', LineBot());
app.post('/userInfo', UserRouter);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});
