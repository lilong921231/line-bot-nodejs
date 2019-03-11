let bot = require('../../line.config');
let serverTest = require('../sever/TalkSever');

function lineBot() {

    bot.on('message', function(event) {
        let callbalk = event.message.text;
        let array = serverTest(callbalk);

        event.reply(array).then(data => {

        }).catch(error => {

        });
    });

    bot.on('postback', function (event) {
        const postback = event.postback.data;
        event.reply(serverTest(postback)).then(data => {
                console.log(data);
            }).catch(error => {

        })
    });

    return bot.parser();
}

module.exports = lineBot();