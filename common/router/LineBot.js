let bot = require('../../line.config');
let serverTest = require('../sever/MondayTalkSever');
let wedSever = require('../sever/WednesdayTalkSever');

function lintBot() {

  /*  console.log('thsi linebot()');
    console.log(event);
    bot.on('message', function(event) {
        console.log('this bot.on');
        console.log(event);
        console.log('++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(event));
        console.log('++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++');
        let callbalk = event.message.text;
        let array;
        if(callbalk === '1') {
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

    /!*    event.reply(array).then(data => {
            console.log('=============JSON================');
            console.log(JSON.stringify(array));
            console.log('=============JSON end================');
        }).catch(error => {
            // error
            console.log(error);
            console.log('=============== error =================');
        })*!/

    });

    bot.on('postback', function (event) {
        console.log('=============postback JSON=============');
        console.log(JSON.stringify(event.postback));
        console.log('=============postback JSON end=============');

        event.reply(serverTest.talkPostback(event.postback.data))
            .then(data => {
                /!*console.log('=============postback=============');
                console.log(JSON.stringify(serverTest.talkPostback(event.postback.data)));*!/
            }).catch(error => {
         /!*   console.log('==============error=============');
            console.log(error);*!/
        })
    });*/
    bot.on('message', function(event) {

        event.reply(event.message.text).then(function (data) {

        }).catch(function (error) {

        })

    });
    return bot.parser();
}

module.exports = lintBot;