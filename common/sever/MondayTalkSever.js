let talkEntity = require('../entity/MondayTalkEntity');
let MondayDataAccess = require('../dataAccess/MondayDataAccess');
let talk = new talkEntity();
let dataAccess = new MondayDataAccess();

let mondayData;

function talkServer(event) {
    const balance = Monday(event)['Balance'];
    switch (event) {
        case 'aiko':
            return [
                talk.firstTimeEntity(balance),
                talk.receiptsOfWeek()
            ];
    }
}

function talkPostback(postback) {
    switch (postback) {
        case 'OK':
            let day = "日月火水木金土".charAt(new Date().getDay());
            return talk.detailedOfWeek('2018-11-09', day, '500000', '-2000000', '20000000');
        case 'ceshi':
            return talk.receiptsOfWeek();
    }
}

function Monday(event) {

    if(event === 'aiko') {
        const eMail = event + '@docomo.ne.jp';
        dataAccess_Monday(eMail);
    } else if(event === 'kennji') {
        const eMail = event + '@yahoo.co.jp';
        dataAccess_Monday(eMail);
    } else if(event === 'hiroshi') {
        const eMail = event + '@docomo.ne.jp';
        dataAccess_Monday(eMail);
    } else if(event === 'kaori') {
        const eMail = event + '@docomo-camera.ne.jp';
        dataAccess_Monday(eMail);
    }
}

function dataAccess_Monday(eMail) {
    dataAccess.Monday(eMali).then(data => {
        return mondayData = data;
    }).catch(err => {
        console.log(err);
    })
}




module.exports = {
    talkServer,
    talkPostback
};