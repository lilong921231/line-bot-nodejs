/*
/!*
let express = require('express');
let bodyParser = require('body-parser');
let bot = require('./line.config');
let serverTest = require('./common/sever/MondayTalkSever');
let wedSever = require('./common/sever/WednesdayTalkSever');
let UserRouter = require('./common/router/UserInfoRouter');
// let LineBot = require('./common/router/LineBot');

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


app.use(bodyParser.json());
app.use(express.static('public'));
app.post('/', bot.parser());
app.post('/userInfo', UserRouter);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});

*!/
var express = require('express');
var bot = require('./line.config');
var serverTest = require('./common/sever/MondayTalkSever');
let wedSever = require('./common/sever/WednesdayTalkSever');


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
app.post('/', linebotParser);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});
*/
var linebot = require('linebot');
var express = require('express');
var bot = require('./line.config');
let lintBot = require('./common/router/LineBot');

function ceshi(event) {
    var ceshi = event.message.text;
    if(ceshi === '1') {
        return ceshi;
    } else if (ceshi === '2'){

        var frontship = {
            type: "template",
            altText: "This is a buttons template",
            template: {
                type: "buttons",
                thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
                imageAspectRatio: "rectangle",
                imageSize: "cover",
                imageBackgroundColor: "#FFFFFF",
                title: "Menu",
                text: "Please select",
                defaultAction: {
                    type: "uri",
                    label: "View detail",
                    uri: "IOSFrontShip://"
                },
                actions: [
                    {
                        type: "postback",
                        label: "Buy",
                        data: "action=buy&itemid=123"
                    },
                    {
                        type: "postback",
                        label: "Add to cart",
                        data: "action=add&itemid=123"
                    },
                    {
                        type: "uri",
                        label: "View detail",
                        uri: "http://example.com/page/123"
                    }
                ]
            }
        };

        return frontship;
    } else if(ceshi === '3') {
        var ios =  'IOSFrontShip://';
        return ios;
    }
}


bot.on('message', function(event) {
    console.log(event.message);
    event.reply(ceshi(event)).then(function (data) {
        // success
    }).catch(function (error) {
        // error
    });
});

const app = express();
const linebotParser = bot.parser();
app.post('/', new lintBot);

//express port:3000
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});
