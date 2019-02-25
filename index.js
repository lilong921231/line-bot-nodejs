var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: "1646638453",
    channelSecret: "c20aee7e28b0b762cbf5adb9e8a1fa96",
    channelAccessToken: "noRmAnxXUXdfOEmrasRRY0IF/YPJd+6WF5XXtQ0Nzhl438A+cvFalWwMAOSY1V2hwY3e6xQERfmGBhv2CxuCiJDF80xy4Ryo9N/" +
        "mMTsd+6z5AZNXJI6fXtL2eCr/gUSIovXzKIDaGBlEDFSaF7BW4gdB04t89/1O/w1cDnyilFU="
});

// event.message.text 用户发出的信息
// event.message 在bot.on里可以直接使用
// event.message.id 信息的id还是用户的id 未知
/*

var
    evetn = {
        type: 'message',// 类型
        replyToken: '', // token
        sourece: {
            userId: '',
            type: 'user',
            profile: [Function], // 功能未知
        },
        timestamp: '', // 时间戳
        message: {
            type: 'text', // 文本类型
            id: '', // 消息id
            text: '', // 用户发送的消息内容
            content: [Function] // 功能未知
        },
        reply: [Function] // 功能未知

    };
// 都可以直接 event加'.'点出来
*/



// bot.on 返回消息用


function ceshi(event) {
    var ceshi = event.message.text;
    if(ceshi === '1') {
        return ceshi;
    } else if (ceshi === '2'){
        var button = {
            type: "template",
            altText: "This is a buttons template",
            template: [
                {
                    type: "buttons",
                    thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
                    imageAspectRatio: "rectangle",
                    imageSize: "cover",
                    imageBackgroundColor: "#FFFFFF",
                    title: "Menu",
                    text: "Please select",
                    defaultAction: [
                        {
                            type: "uri",
                            label: "View detail",
                            uri: "http://example.com/page/123"
                        },
                        {
                            type: "uri",
                            label: "View detail",
                            uri: "http://example.com/page/123"
                        }
                    ],
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

                },
                {
                    type: "buttons",
                    thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
                    imageAspectRatio: "rectangle",
                    imageSize: "cover",
                    imageBackgroundColor: "#FFFFFF",
                    title: "Menu",
                    text: "Please select",
                    defaultAction: [
                        {
                            type: "uri",
                            label: "View detail",
                            uri: "http://example.com/page/123"
                        },
                        {
                            type: "uri",
                            label: "View detail",
                            uri: "http://example.com/page/123"
                        }],
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

                }]
        };

        return button;
    } else if(ceshi === 'ios') {
        var ios = 'IOSFrontShip://';
        return ios;
    }
}


bot.on('message', function(event) {
    console.log(event.message);

    event.reply(ceshi(event)).then(function (data) {
    // success
    }).catch(function (error) {
        // error
    });

});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express port:3000
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port:", port);
});
