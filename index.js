const express = require('express');
const bot = require('./line.config');
const serverTest = require('./common/MondayTalkSever');
const wedSever = require('./common/WednesdayTalkSever');

const app = express();
let server;

botInitial();
serverInitial();

let infos, lineInfos = {}, userId = "";
function infosReply(event) {
    event.reply(infos[lineInfos.userId]).then(function (data) {
        console.log("=============success==============");
        console.log(event.message.text);
        console.log(event.source.userId);
        console.log(data);
        lineInfos.userId = lineInfos.userId + 1;
        const timer = setInterval(function(){
            infosReply(event);
            lineInfos.userId = lineInfos.userId + 1;
            if (lineInfos.userId >= infos.length) {
                clearTimeout(timer);
            }
        }, 1000);
    }).catch(function (error) {
        // error
        console.log("=============error==============");
        console.log(error);
    });
}
function botInitial(){

    bot.on('message', function(event) {
        userId = event.source.userId;
        lineInfos[userId] = 0;
        console.log('++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(event));
        console.log('++++++++++++++++++++++++++++++++++++++');
        infos = serverTest.talkServer(event.message.text);
        switch (event.message.text) {
            case "1":
                infos = serverTest.talkServer(event.message.text);
                break;
            case "3":
                infos = wedSever.wedTalkSever(event.message.text);
                break;
        }
        infosReply(event);
    });

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