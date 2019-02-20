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

bot.on('message', function(event) {
    console.log(event.message);




    event.reply(baidu).then(function (data) {
     /* console.log('data');
      console.log(data); // 信息暂无*/
    // success
    }).catch(function (error) {
        // error
    });


    setTimeout(function(){
        var userId = event.message.userId;
        var sendMsg = 'test';
        bot.push(userId,sendMsg);
        console.log(bot.toString());
        console.log(bot);
        console.log('send: '+sendMsg);
        var baidu = 'http://www.baidu.com';
        event.reply(baidu).then(function (data) {

        }).catch(function (error) {

        });
    },5000);





});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express port:3000
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port:", port);
});
