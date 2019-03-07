let talkEntity = require('../entity/WednesdayTalkEntity');
let talk = new talkEntity();

function wedTalkSever(postback) {
    switch (postback) {
        case '3':
            return [
                talk.rentText('3', '12'),
                talk.maxYearsLoan('35', '4000'),
                talk.tenYearsFromNow('45', '24', '12', '4000'),
                talk.paymentDueToAgeChange('4000', '35', '45', '35',
                    '24', '12', '8079', '14', '7923', '40'),
                talk.Consultation()
            ];
    }
}

module.exports = {
    wedTalkSever
};