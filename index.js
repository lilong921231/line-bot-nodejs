let express = require('express');
let bodyParser = require('body-parser');
let bot = require('./line.config');
let serverTest = require('./common/sever/MondayTalkSever');
let wedSever = require('./common/sever/WednesdayTalkSever');
let UserRouter = require('./common/router/UserInfoRouter');


bot.on('message', function(event) {
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log(JSON.stringify(event));
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++');
    let callbalk = event.message.text;
    let array;
    if(callbalk === '1') {
        array = [
            serverTest.talkServer(callbalk).mondayFirstTime,
            serverTest.talkServer(callbalk).mondayReceipts
        ];
    } else if (callbalk === '3'){
        array = [
            wedSever.wedTalkSever(callbalk).wedRent,
            wedSever.wedTalkSever(callbalk).wedLoan,
            wedSever.wedTalkSever(callbalk).wedTenYears,
            wedSever.wedTalkSever(callbalk).wedPayment,
            wedSever.wedTalkSever(callbalk).wedConsultation
        ];
    }


    event.reply(array).then(function (data) {
        event.reply(array).then(function (data) {
           console.log('OK');
        });
        console.log('=============JSON================');
        console.log(JSON.stringify(array));
        console.log('=============JSON end================');
    }).catch(function (error) {
        // error
        console.log(error);
        console.log('=============== error =================');
    })

});

bot.on('postback', function (event) {
    console.log('=============postback JSON=============');

    console.log(JSON.stringify(event.postback));
    console.log('=============postback JSON end=============');

    event.reply(serverTest.talkPostback(event.postback.data))
        .then(function (data) {
            console.log('=============postback=============');
            console.log(JSON.stringify(serverTest.talkPostback(event.postback.data)));
    }).catch(function(error) {
        console.log('==============error=============');
        console.log(error);
    })
});

const app = express();
const linebotParser = bot.parser();

app.use(bodyParser.json());
app.use(express.static('public'));
app.post('/', linebotParser);
app.post('/userInfo', UserRouter);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});


