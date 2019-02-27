var express = require('express');
var bot = require('./line.config');
var server = require('common/server.js');


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


    console.log(server(event));
    console.log(event.message);
    event.reply(server(event.message.text)).then(function (data) {
        // success
    }).catch(function (error) {
        // error
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
