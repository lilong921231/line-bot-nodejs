let mantalkEntity = require('../entity/MondayTalkEntity');
let wedtalkEntity = require('../entity/WednesdayTalkEntity');
let MondayDataAccess = require('../dataAccess/MondayDataAccess');
let UserDetailed = require('../entity/UserDetailed');
let talk = new mantalkEntity();
let wed = new wedtalkEntity();
let dataAccess = new MondayDataAccess();

function talkServer(event) {
    Monday(event).then(data => {
        let day = "日月火水木金土".charAt(new Date().getDay());
        UserDetailed = data;
        const date = new Date();
        const years = date.getFullYear();
        const month = date.getMonth();
        const days = date.getDay();

        const nowDate = years + '-' + month + '-' + days;
        switch (event) {
            case 'aiko':
                return [
                    talk.firstTimeEntity(UserDetailed[0].Balance),
                    talk.receiptsOfWeek()
                ];
            case 'OK':
                return [
                    talk.detailedOfWeek(nowDate, day, UserDetailed[0].Salary, UserDetailed[0].Rent, UserDetailed[0].Deduction),
                    talk.Recommend(UserDetailed[0].Income)
                ];
            case 'events':
                return talk.thisWeekEvent(nowDate, day, '10800');
            case '水曜日':
                return [
                    wed.rentText('3', '12'),
                    wed.maxYearsLoan('35', '4000'),
                    wed.tenYearsFromNow('45', '24', '12', '4000'),
                    wed.paymentDueToAgeChange('4000', '35', '45', '35',
                        '24', '12', '8079', '14', '7923', '40'),
                    wed.Consultation()
                ];
        }
    }).catch(err => {
        console.log(err);
    });
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
    } else {
        return event;
    }
}

module.exports = talkServer;