let bot = require('../../line.config');
let serverTest = require('../sever/MondayTalkSever');
let wedSever = require('../sever/WednesdayTalkSever');

function lintBot() {
    bot.on('message', function(event) {
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
        console.log('data id null ');
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
    });
  /*  bot.on('message', function(event) {

        event.reply(event.message.text).then(function (data) {

        }).catch(function (error) {

        })

    });*/
    return bot.parser();
}

module.exports = lintBot;