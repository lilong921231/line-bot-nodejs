const commonEntity = require('./CommonEntity');
const monTalk = require('./MondayTalkEntity');
const wedTalk = require('./WednesdayTalkEntity');

const talkEntity = {
    getBasicInfos(balance) {
        return [
            monTalk.firstTimeEntity(balance),
            monTalk.receiptsOfWeek()
        ];
    },
    getMonReceiptsInfos(userInfo){
        return [
            monTalk.detailedOfWeek(
                commonEntity.dateTime("YYYY-MM-DD"),
                "YYYY年 MM月DD日(dd)",
                userInfo.Salary, userInfo.Rent, userInfo.Deduction
            ),
            monTalk.Recommend(userInfo.Income)
        ];
    },
    getMonEventsInfos(money){
        return [
            monTalk.thisWeekEvent(commonEntity.dateTime("YYYY-MM-DD"), "YYYY年 MM月DD日(dd)", money)
        ];
    },
    getWedRentLoanInfos(objs){
        return [
            wedTalk.rentText(objs.rent),
            wedTalk.maxYearsLoan(objs.yearsLoan),
            wedTalk.tenYearsFromNow(objs.yearsFromNow),
            wedTalk.paymentDueToAgeChange(objs.paymentDueTo),
            wedTalk.Consultation()
        ];
    }
};

module.exports = talkEntity;