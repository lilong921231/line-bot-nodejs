let bot = require('../../line.config');
let serverTest = require('../sever/MondayTalkSever');
let testServer = require('../sever/testServer');
let wedSever = require('../sever/WednesdayTalkSever');

function lineBot() {

    bot.on('message', function(event) {
        let callbalk = event.message.text;
     //   let array;
  /*      if(callbalk === 'aiko') {
            array = [
                testServer.talkServer(callbalk)
            ];
        } else if (callbalk === '3'){
            array = [
                wedSever.wedTalkSever(callbalk).wedRent,
                wedSever.wedTalkSever(callbalk).wedLoan,
                wedSever.wedTalkSever(callbalk).wedTenYears,
                wedSever.wedTalkSever(callbalk).wedPayment,
                wedSever.wedTalkSever(callbalk).wedConsultation
            ];
        }*/
        event.reply( testServer.talkServer(callbalk)).then(data => {

        }).catch(error => {

        });
    });

    bot.on('postback', function (event) {
        event.reply(testServer.talkPostback(event.postback.data))
            .then(data => {
                console.log(data);
                console.log('============postback==========');

            }).catch(error => {

        })
    });

    return bot.parser();
}

module.exports = lineBot();