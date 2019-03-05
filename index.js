const express = require('express');
const bot = require('./line.config');
const serverTest = require('./common/MondayTalkSever');
const wedSever = require('./common/WednesdayTalkSever');

const app = express();
let server;

botInitial();
serverInitial();

let infos, lineInfos = {}, index = 0, userId = "";
function infosReply(event) {
    //, event.replyToken
    console.log("=============event==============");
    console.log(event);
    event.reply(infos[lineInfos[userId]]).then(function (data) {
        console.log("=============success"+index+"==============");
        // console.log(event.message.text);
        console.log(data);
        index++;
        lineInfos[userId] = index;
        const timer = setInterval(function(){
            if (lineInfos[userId] < infos.length) {
                // infosReply(event);
                bot.push(userId, infos[lineInfos[userId]]);
                index++;
                lineInfos[userId] = index;
            } else {
                clearTimeout(timer);
            }
        }, 2000);
    }).catch(function (error) {
        // error
        console.log("=============error==============");
        console.log(error);
    });
}
function botInitial(){

    bot.on('message', res => {
        userId = res.source.userId;
        index = 0;
        lineInfos[userId] = index;
        console.log('++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(res));
        console.log('++++++++++++++++++++++++++++++++++++++');
        infos = serverTest.talkServer(res.message.text);
        switch (res.message.text) {
            case "1":
                infos = serverTest.talkServer(res.message.text);
                break;
            case "3":
                infos = wedSever.wedTalkSever(res.message.text);
                break;
        }
        infosReply(res);
    });

    // bot.on('message', function(event) {
    //     userId = event.source.userId;
    //     index = 0;
    //     lineInfos[userId] = index;
    //     console.log('++++++++++++++++++++++++++++++++++++++');
    //     console.log(JSON.stringify(event));
    //     console.log('++++++++++++++++++++++++++++++++++++++');
    //     infos = serverTest.talkServer(event.message.text);
    //     switch (event.message.text) {
    //         case "1":
    //             infos = serverTest.talkServer(event.message.text);
    //             break;
    //         case "3":
    //             infos = wedSever.wedTalkSever(event.message.text);
    //             break;
    //     }
    //     infosReply(event);
    // });

    // bot.on('message', function(event) {
    //     console.log('++++++++++++++++++++++++++++++++++++++');
    //     console.log('++++++++++++++++++++++++++++++++++++++');
    //     console.log(JSON.stringify(event));
    //     console.log('++++++++++++++++++++++++++++++++++++++');
    //     console.log('++++++++++++++++++++++++++++++++++++++');
    //     let callbalk = event.message.text;
    //     let array;
    //     if(callbalk === '1') {
    //         array = [
    //             serverTest.talkServer(callbalk).mondayFirstTime,
    //             serverTest.talkServer(callbalk).mondayReceipts
    //         ];
    //     } else if (callbalk === '3'){
    //         array = [
    //             wedSever.wedTalkSever(callbalk).wedRent,
    //             wedSever.wedTalkSever(callbalk).wedLoan,
    //             wedSever.wedTalkSever(callbalk).wedTenYears,
    //             wedSever.wedTalkSever(callbalk).wedPayment,
    //             wedSever.wedTalkSever(callbalk).wedConsultation
    //         ];
    //     }
    //
    //
    //     event.reply(array).then(function (data) {
    //         console.log('=============JSON================');
    //         console.log(JSON.stringify(array));
    //         console.log('=============JSON end================');
    //     }).catch(function (error) {
    //         // error
    //         console.log(error);
    //         console.log('=============== error =================');
    //     });
    //
    // });

    bot.on('postback', function (event) {
        console.log('=============postback JSON=============');

        console.log(JSON.stringify(event.postback));
        console.log('=============postback JSON end=============');

        event.reply(serverTest.talkPostback(event.postback.data)).then(function (data) {
            console.log('=============postback=============');
            console.log(JSON.stringify(serverTest.talkPostback(event.postback.data)));
        }).catch(function(error) {
            console.log('==============error=============');
            console.log(error);
        });
    });

}

function serverInitial() {
    const linebotParser = bot.parser();
    app.post('/', linebotParser);

    app.use(express.static('public'));

    //express port:3000
    server = app.listen(process.env.PORT || 3000, function() {
        const port = server.address().port;
        console.log("App now running on port:", port);
    });
}

function replyMessage(replyToken, message) {
    return new Promise((resolve, reject)=>{
        const options = {
            method: 'POST',
            host: 'api.line.me',
            port: '8080',
            path: '/v2/bot/message/reply',
            headers: headers(userId, date)
        };

        const postData = userInsight.getInsights("en");

        let response = "";
        const req = http.request(options,function(res){

            console.log('STATUS: ' + res.statusCode);
            if (res.statusCode === 200) {
                console.log(res.headers);
                res.setEncoding('utf-8');
                res.on('data',function(chunk){
                    // console.log(chunk);
                    response += chunk;
                });
                res.on('end',function(chunk){
                    console.log("============response================");
                    console.log(JSON.parse(response));
                    resolve(JSON.parse(response));
                });
            }
        }).on('error',function(e){
            console.log('problem with request: ' + e.message);
            console.log(e);
        });

        req.write(JSON.stringify(postData));

        req.end();
    });
}