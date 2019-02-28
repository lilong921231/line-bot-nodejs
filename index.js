/*
var express = require('express');
var bot = require('./line.config');
var serverTest = require('./common/TalkSever');


function ceshi(event) {
    var ceshi = event.message.text;
    if(ceshi === '1') {
        return ceshi;
    } else if (ceshi === '2'){

        var frontship = {
            type: "template",
            altText: "This is a buttons template",
            template: {
                type: "buttons",
                thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
                imageAspectRatio: "rectangle",
                imageSize: "cover",
                imageBackgroundColor: "#FFFFFF",
                title: "Menu",
                text: "Please select",
                defaultAction: {
                    type: "uri",
                    label: "View detail",
                    uri: "IOSFrontShip://"
                },
                actions: [
                    {
                        type: "postback",
                        label: "Buy",
                        data: "action=buy&itemid=123"
                    },
                    {
                        type: "postback",
                        label: "Add to cart",
                        data: "action=add&itemid=123"
                    },
                    {
                        type: "uri",
                        label: "View detail",
                        uri: "http://example.com/page/123"
                    }
                ]
            }
        };

        return frontship;
    } else if(ceshi === '3') {
        var ios =  'IOSFrontShip://';
        return ios;
    }
}
bot.on('message', function(event) {
    console.log(event.message);
    event.reply(serverTest.talkServer(event.message.text)).then(function (data) {
        // success
        console.log('=============== server =================');
        console.log(event.message);
        console.log(serverTest.talkServer(event.message.text));
    }).catch(function (error) {
        // error
        console.log(error);
        console.log('=============== error =================');
    });
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});
*/
// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);


// -----------------------------------------------------------------------------
// ルーター設定
server.post('/', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
    console.log(req.body);
});