let talkEntity = require('./entity/WednesdayTalkEntity');
let talk = new talkEntity();

function wedTalkPostback(postback) {
    switch (postback) {
        case '3':
            return {
                wedRent: talk.rentText('3', '12'),
                wedLoan: talk.maxYearsLoan('35', '4000'),
                wedTenYears: talk.tenYearsFromNow('45', '24', '12', '4000'),
                wedPayment: talk.paymentDueToAgeChange('4000', '35', '45', '35',
                    '24', '12', '8079', '14', '7923', '40'),
                wedConsultation: talk.Consultation()
            }
    }
}

module.exports = {
    wedTalkPostback
}