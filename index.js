var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: "1646638453",
    channelSecret: "c20aee7e28b0b762cbf5adb9e8a1fa96",
    channelAccessToken: "noRmAnxXUXdfOEmrasRRY0IF/YPJd+6WF5XXtQ0Nzhl438A+cvFalWwMAOSY1V2hwY3e6xQERfmGBhv2CxuCiJDF80xy4Ryo9N/" +
        "mMTsd+6z5AZNXJI6fXtL2eCr/gUSIovXzKIDaGBlEDFSaF7BW4gdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function(event) {
  event.reply(event.message.text).then(function (data) {
      console.log('event.reple');
      console.log(event.message.text);
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
