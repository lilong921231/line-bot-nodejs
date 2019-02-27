var talkEntity = require('./entity/TalkEntity');
// var ceshi = require('../public/images/wages.png');
var talk = new talkEntity();


function talkServer(eventSelect) {
    switch (eventSelect) {
        case '1':
            console.log("=========test1===========");
            return talk.firstTimeEntity('5000000');
        case '2':
            console.log("=========test2===========");
            var day = "日月火水木金土".charAt(new Date().getDay());
            return talk.detailedOfWeek('2018-11-09', day, '500000', '-2000000', '20000000');
        case '3':
            return {
                type: "image",
                originalContentUrl: "https://github.com/lilong921231/line-bot-nodejs/blob/master/public/images/wages",
                previewImageUrl: "https://github.com/lilong921231/line-bot-nodejs/blob/master/public/images/wages"
            };
    }
}

module.exports = {
    talkServer
};
