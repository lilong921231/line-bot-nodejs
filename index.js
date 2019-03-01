var express = require('express');
var bot = require('./line.config');
var serverTest = require('./common/TalkSever');

// bot.on('message', function(event) {
//     console.log('++++++++++++++++++++++++++++++++++++++');
//     console.log('++++++++++++++++++++++++++++++++++++++');
//     console.log(JSON.stringify(event));
//     console.log(event);
//     console.log('++++++++++++++++++++++++++++++++++++++');
//     console.log('++++++++++++++++++++++++++++++++++++++');
//    /* let ceshi;
//     if(serverTest.talkServer(event.message.text).contents.header.contents[2].action.text === '2') {
//         ceshi = serverTest.talkServer('2');
//     } else {
//        ceshi = serverTest.talkServer(event.message.text);
//     }
// */
//
//         event.reply(serverTest.talkServer(event.message.text)).then(function (data) {
//         // success
//         console.log('=============== server =================');
//         console.log(event.message);
//         console.log(serverTest.talkServer(event.message.text));
//
//         console.log('=============JSON================');
//         console.log(JSON.stringify(serverTest.talkServer(event.message.text)));
//             console.log('=============JSON end================');
//     }).catch(function (error) {
//         // error
//         console.log(error);
//         console.log('=============== error =================');
//     });
// });
//
// const app = express();
// const linebotParser = bot.parser();
// app.post('/', linebotParser);
//
// //express port:3000
// var server = app.listen(process.env.PORT || 3000, function() {
//     var port = server.address().port;
//     console.log("App now running on port:", port);
// });
//




var CHANNEL_ACCESS_TOKEN = "noRmAnxXUXdfOEmrasRRY0IF/YPJd+6WF5XXtQ0Nzhl438A+cvFalWwMAOSY1V2hwY3e6xQERfmGBhv2CxuCiJDF80xy4Ryo9N/" +
    "mMTsd+6z5AZNXJI6fXtL2eCr/gUSIovXzKIDaGBlEDFSaF7BW4gdB04t89/1O/w1cDnyilFU=";

function doPost(e) {
    var contents = e.postData.contents;
    var obj = JSON.parse(contents);
    var events = obj["events"];
    for (var i = 0; i < events.length; i++) {
        if (events[i].type === "message") {
            reply_message(events[i]);
        } else if (events[i].type === "postback") {
            post_back(events[i]);
        }
    }
}

function reply_message(e) {
    var input_text = e.message.text;
    if (input_text === "button") {
        var postData = {
            "replyToken": e.replyToken,
            "messages": [{
                "type": "template",
                "altText": "select",
                "template": {
                    "type": "buttons",
                    "thumbnailImageUrl": "https://~.png",
                    "title": "Menu",
                    "text": "Please select",
                    "actions": [{
                        "type": "postback",
                        "label": "postback",
                        "data": "postback selected"
                    },
                        {
                            "type": "message",
                            "label": "message",
                            "text": "text:message"
                        },
                        {
                            "type": "uri",
                            "label": "uri",
                            "uri": "https://linecorp.com"
                        },
                        {
                            "type": "datetimepicker",
                            "label": "datetimepicker",
                            "data": "datetimepicker selected",
                            "mode": "datetime",
                            "initial": "2017-10-25T00:00",
                            "max": 　 "2017-12-31T23:59",
                            "min": "2017-01-01T00:00"
                        }
                    ]
                }
            }]
        };
    }
    fetch_data(postData);
}

function post_back(e) {
    var data = e.postback.data;
    var replay_text = "";
    if (data === "postback selected") {
        replay_text = data;
    } else if (data === "datetimepicker selected") {
        replay_text = data + "\n" + e.postback.params['datetime'];
    }

    var postData = {
        "replyToken": e.replyToken,
        "messages": [{
            "type": "text",
            "text": replay_text + "\n" + JSON.stringify(e.postback)
        }]
    };
    fetch_data(postData);
}

function fetch_data(postData) {
    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
        },
        "payload": JSON.stringify(postData)
    };
    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
}





// -----------------------------------------------------------------------------
// モジュールのインポート
/*
var server = require("express")();
var line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
var line_config = {
    channelId: "1646638453",
    channelSecret: "c20aee7e28b0b762cbf5adb9e8a1fa96",
    channelAccessToken: "noRmAnxXUXdfOEmrasRRY0IF/YPJd+6WF5XXtQ0Nzhl438A+cvFalWwMAOSY1V2hwY3e6xQERfmGBhv2CxuCiJDF80xy4Ryo9N/" +
        "mMTsd+6z5AZNXJI6fXtL2eCr/gUSIovXzKIDaGBlEDFSaF7BW4gdB04t89/1O/w1cDnyilFU="
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);
// -----------------------------------------------------------------------------
// ルーター設定
server.post('/', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        // if (event.type === "message" && event.message.type === "text"){
            events_processed.push(bot.replyMessage(event.replyToken,
                serverTest.talkServer(event.message.text)));
        // }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});*/
