let talkEntity = require('../entity/MondayTalkEntity');
let MondayDataAccess = require('../dataAccess/MondayDataAccess');
let UserDetailed = require('../entity/UserDetailed');
let talk = new talkEntity();
let dataAccess = new MondayDataAccess();


function talkServer(event) {
    console.log(event);
    let day = "日月火水木金土".charAt(new Date().getDay());
    switch (event) {
        case 'aiko':
            console.log('==========ceshi==========');
            return [
                talk.firstTimeEntity('560000000'),
                talk.receiptsOfWeek()
            ];
        case 'OK':
            return [
                talk.detailedOfWeek('2018-11-09', day, '500000', '-2000000', '20000000'),
                talk.Recommend('50000')
            ];
        case 'events':
            console.log('=============== events =============');
            return talk.thisWeekEvent('2018-11-09', day, '10800');
    }

}

module.exports = talkServer;