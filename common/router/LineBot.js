let bot = require('../../line.config');
let serverTest = require('../sever/MondayTalkSever');
let testServer = require('../sever/testServer');
let wedSever = require('../sever/WednesdayTalkSever');

function lineBot() {

    bot.on('message', function(event) {
        let callbalk = event.message.text;
        let array;

        if(callbalk === '水曜日') {
            array = wedSever(callbalk);
        } else {
            array = testServer(callbalk);
        }

        event.reply(array).then(data => {

        }).catch(error => {

        });
    });

    bot.on('postback', function (event) {
        const postback = event.postback.data;
        event.reply(testServer(postback)).then(data => {
                console.log(data);
                console.log('============postback==========');

            }).catch(error => {

        })
    });

    return bot.parser();
}

module.exports = lineBot();