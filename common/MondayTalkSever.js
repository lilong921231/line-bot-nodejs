var talkEntity = require('./entity/MondayTalkEntity');
var talk = new talkEntity();


function talkServer(eventSelect) {
    switch (eventSelect) {
        case '1':
            return {
                mondayFirstTime: talk.firstTimeEntity('5000000'),
                mondayReceipts: talk.receiptsOfWeek()
            };
    }

}

function talkPostback(postback) {
    switch (postback) {
        case 'OK':
            var day = "日月火水木金土".charAt(new Date().getDay());
            return talk.detailedOfWeek('2018-11-09', day, '500000', '-2000000', '20000000');
        case 'ceshi':
            return talk.receiptsOfWeek();
    }
}

module.exports = {
    talkServer,
    talkPostback
};
