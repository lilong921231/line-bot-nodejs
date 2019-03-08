let bot = require('../../line.config');
let serverTest = require('../sever/MondayTalkSever');
let wedSever = require('../sever/WednesdayTalkSever');

function lineBot() {

/*    bot.on('message', function(event) {
        let callbalk = event.message.text;
        let array;
        if(callbalk === 'aiko') {
            array = [
                serverTest.talkServer(callbalk)
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
        event.reply(array).then(data => {

        }).catch(error => {

        });
    });

    bot.on('postback', function (event) {
        console.log('=============postback JSON=============');
        console.log(JSON.stringify(event.postback));
        console.log('=============postback JSON end=============');

        event.reply(serverTest.talkPostback(event.postback.data))
            .then(data => {

            }).catch(error => {

        })
    });*/
    bot.on('message', function(event) {
        console.log('ceshi linebot');
        event.reply(event.message.text).then(function (data) {
            console.log(event.message.text);
            console.log(data);
        }).catch(function (error) {
            console.log(error);
        });

    });
    return bot.parser();
}

module.exports = lineBot();