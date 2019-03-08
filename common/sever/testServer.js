let talkEntity = require('../entity/MondayTalkEntity');
let MondayDataAccess = require('../dataAccess/MondayDataAccess');
let UserDetailed = require('../entity/UserDetailed');
let talk = new talkEntity();
let dataAccess = new MondayDataAccess();


function talkServer(event) {
    console.log(event);
    switch (event) {
        case 'aiko':
            console.log('==========ceshi==========');
            return [
                // talk.firstTimeEntity(UserDetailed[0].Balance),
                talk.firstTimeEntity('560000000'),
                talk.receiptsOfWeek()
            ];
    }


    /*Monday(event).then(data => {
        UserDetailed = data;

    }).catch(err => {
        console.log(err);
    });*/

}

function talkPostback(postback) {
    let day = "日月火水木金土".charAt(new Date().getDay());

    console.log(postback);


    switch (postback) {
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

function Monday(event) {
    if(event === 'aiko') {
        const eMail = event + '@docomo.ne.jp';
        return dataAccess.Monday(eMail);
    } else if(event === 'kennji') {
        const eMail = event + '@yahoo.co.jp';
        return dataAccess.Monday(eMail);
    } else if(event === 'hiroshi') {
        const eMail = event + '@docomo.ne.jp';
        return dataAccess.Monday(eMail);
    } else if(event === 'kaori') {
        const eMail = event + '@docomo-camera.ne.jp';
        return dataAccess.Monday(eMail);
    }
}

module.exports = {
    talkServer,
    talkPostback
};