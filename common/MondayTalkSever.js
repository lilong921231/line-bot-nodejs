var talkEntity = require('./entity/MondayTalkEntity');
// var ceshi = require('../public/images/wages.png');
var talk = new talkEntity();


function talkServer(eventSelect) {
    switch (eventSelect) {
        case '1':
            talk.firstTimeEntity('5000000');
        case '2':
            talk.receiptsOfWeek();
            break;
        case '3':
            var day = "日月火水木金土".charAt(new Date().getDay());
            return talk.detailedOfWeek('2018-11-09', day, '500000', '-2000000', '20000000');

    }

}

module.exports = {
    talkServer
};
