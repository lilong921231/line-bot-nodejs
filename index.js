var express = require('express');
var bot = require('./line.config');
var serverTest = require('./common/MondayTalkSever');

bot.on('message', function(event) {
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log(JSON.stringify(event));
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++++++++++');
    let callbalk;
    let array = [
        serverTest.talkServer(event.message.text).mondayFirstTime,
        serverTest.talkServer(event.message.text).mondayReceipts
    ];

    for (var i = 0; i < array.length; i++) {
        event.reply(array[i]).then(function (data) {
            // success
            // console.log('=============== server =================');
            //     console.log('==============postback=============');
            //     console.log(event.postback.data);
            console.log('=============JSON================');
            console.log(JSON.stringify(serverTest.talkServer(event.message.text)));
            console.log('=============JSON end================');
        }).catch(function (error) {
            // error
            console.log(error);
            console.log('=============== error =================');
        });
    }

});

bot.on('postback', function (event) {
    console.log('=============postback JSON=============');

    console.log(JSON.stringify(event.postback));
    console.log('=============postback JSON end=============');

    event.reply(serverTest.talkPostback(event.postback.data))
        .then(function (data) {
            console.log('=============postback=============');
            console.log(JSON.stringify(serverTest.talkPostback(event.postback.data)));
    }).catch(function(error) {
        console.log('==============error=============')
        console.log(error);
    })
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express port:3000
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("App now running on port:", port);
});


