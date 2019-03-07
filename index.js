/*
let express = require('express');
let bodyParser = require('body-parser');
// let linebot = require('./line.config');
let serverTest = require('./common/sever/MondayTalkSever');
let wedSever = require('./common/sever/WednesdayTalkSever');
let UserRouter = require('./common/router/UserInfoRouter');
// let LineBot = require('./common/router/LineBot');
let linebot = require('linebot');

bot = linebot({
    channelId: "1646638453", // lineアカウントのID
    channelSecret: "c20aee7e28b0b762cbf5adb9e8a1fa96", // lineのChannel_Secret
    channelAccessToken: "noRmAnxXUXdfOEmrasRRY0IF/YPJd+6WF5XXtQ0Nzhl438A+cvFalWwMAOSY1V2hwY3e6xQERfmGBhv2CxuCiJDF80xy4Ryo9N/" +
        "mMTsd+6z5AZNXJI6fXtL2eCr/gUSIovXzKIDaGBlEDFSaF7BW4gdB04t89/1O/w1cDnyilFU=" // lineのChannel_Access_Token
});
bot.on('message', function(event) {

    console.log('ceshi');


  /!*  console.log('++++++++++++++++++++++++++++++++++++++');
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
*!/

    event.reply(event.message.text).then(function () {
        console.log('=============JSON================');
        console.log(JSON.stringify(event.message.text));
        console.log('=============JSON end================');
    }).catch(function (error) {
        // error
        console.log(error);
        console.log('=============== error =================');
    })

});
/!*

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
*!/

const app = express();
const linebotParser =  bot.parser();

app.use(bodyParser.json());
app.use(express.static('public'));
app.post('/', linebotParser);
app.post('/userInfo', UserRouter);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});

*/
var express = require('express');
var bot = require('./line.config');
var serverTest = require('./common/sever/MondayTalkSever');
let wedSever = require('./common/sever/WednesdayTalkSever');


bot.on('message', function(event) {

    event.reply(event.message.text).then(function (data) {
    }).catch(function (error) {
    })

});

/*
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
*/

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});