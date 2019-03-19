const commonEntity = require('./CommonEntity');
const monTalk = require('./MondayTalkEntity');
const wedTalk = require('./WednesdayTalkEntity');

const insightFlex = require('./InsightCardEntity');
const insightApi = require('../dataAccess/InsightApiDataAccess');

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
    getWedRentLoanInfos(objs, flag){
        return [
            wedTalk.rentText(objs.rent),
            wedTalk.maxYearsLoan(objs.yearsLoan),
            wedTalk.tenYearsFromNow(objs.yearsFromNow),
            wedTalk.paymentDueToAgeChange(objs.paymentDueTo),
            wedTalk.Consultation()
        ];
    },
    getUserInsights(userId, byId) {
        return insightApi.GetInsights(userId, byId).then(data => {
            if (typeof(data) === "string" && data === "MsgId") {
                return [commonEntity.getMessageInfo(commonEntity.getNoPId())];
            }
            // console.log(data);
            return insightFlex.parseEntity(data);
        });
    }
};

module.exports = talkEntity;