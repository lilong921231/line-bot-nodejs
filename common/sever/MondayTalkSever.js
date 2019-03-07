let talkEntity = require('../entity/MondayTalkEntity');
let MondayDataAccess = require('../dataAccess/MondayDataAccess');
let UserDetailed = require('../entity/UserDetailed');
let talk = new talkEntity();
let dataAccess = new MondayDataAccess();


function talkServer(event) {
    UserDetailed = Monday(event);
    console.log(UserDetailed);
    console.log('==============dataAccess_Monday=============');
    console.log(UserDetailed);
    console.log('==============dataAccess_Monday end=============');
    console.log(JSON.stringify(UserDetailed));
    switch (event) {
        case 'aiko':
            return [
                talk.firstTimeEntity(UserDetailed['Balance']),
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
        console.log('==============Mondey=============');
        console.log(dataAccess_Monday(eMail));
        console.log('==============Mondey end=============');
        return dataAccess_Monday(eMail);
    } else if(event === 'kennji') {
        const eMail = event + '@yahoo.co.jp';
        return dataAccess_Monday(eMail);
    } else if(event === 'hiroshi') {
        const eMail = event + '@docomo.ne.jp';
        return dataAccess_Monday(eMail);
    } else if(event === 'kaori') {
        const eMail = event + '@docomo-camera.ne.jp';
        return dataAccess_Monday(eMail);
    }
}

function dataAccess_Monday(eMail) {
    dataAccess.Monday(eMail).then(myData => {
        console.log('==============dataAccess_Monday=============');
        console.log(dataAccess_Monday(data));
        console.log('==============dataAccess_Monday end=============');
        console.log(data);
        return myData;
    }).catch(err => {
        console.log(err);
    })
}




module.exports = {
    talkServer,
    talkPostback
};