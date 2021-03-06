let bot = require('../../line.config');
let talkSever = require('../sever/TalkSever');
const commonEntity = require('../entity/CommonEntity');

function lineBot() {

    const callback = function (event, data) {
        event.reply(data).then(res => {
            if (res.hasOwnProperty("message")) {
                console.log(res);
            }
        }).catch(err => {
            console.log(err);
        });
    };

    bot.on('message', function(event) {
        const type = event.message.type;
        if (type === "text") {
            if (event.message.text === "1") {
                talkSever.Wednesday().then(data => {
                    callback(event, data);
                });
                return;
            }
            if (event.message.text === "en" || event.message.text === "jp") {
                commonEntity.setInsightLangId(event.message.text);
                return;
            }
            talkSever.service(event.message.text).then(data => {
                // console.log(JSON.stringify(data));
                callback(event, data);
            });
        } else if (type === "sticker") {
            // console.log(event.message.stickerId);
            switch (event.message.stickerId) {
                case "148457390":
                    talkSever.Wednesday().then(data => {
                        callback(event, data);
                    });
                    break;
                case "148457391":
                    const user = commonEntity.getUserAccount();
                    talkSever.service(user).then(data => {
                        callback(event, data);
                    });
                    break;
                case "148457392":
                    talkSever.UserInsights(event.source.userId).then(data => {
                        // console.log(JSON.stringify(data));
                        callback(event, data);
                    });
                    break;
                default:
                    callback(event, [commonEntity.getMessageInfo(commonEntity.getNoMsgId())]);
            }
        }
        //sticker = { type: 'sticker', id: '9504475357600', stickerId: '148457390', packageId: '13478' }
    });

    bot.on('postback', function (event) {
        // console.log(event);
        talkSever.service(event.postback.data).then(data => {
            // console.log(JSON.stringify(data));
            // console.log(data);
            callback(event, data);
        });
    });

    return bot.parser();
}

module.exports = lineBot();