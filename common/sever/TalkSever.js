const commonEntity = require('../entity/CommonEntity');
const talkEntity = require('../entity/TalkEntity');

const insightApi = require('../dataAccess/InsightApiDataAccess');
const insightFlex = require('../entity/InsightCardEntity');

// let monTalkEntity = require('../entity/MondayTalkEntity');
// let wedTalkEntity = require('../entity/WednesdayTalkEntity');
let MondayDataAccess = require('../dataAccess/MondayDataAccess');
let UserDetailed = require('../entity/UserDetailed');

// let talk = new monTalkEntity();
// let wed = new wedTalkEntity();
let dataAccess = new MondayDataAccess();

// let interest = 0.00133;
// console.log(moment().format('YYYY年 MM月Do[(]dd[)]'));
// console.log(moment().format("MM/DD/YYYY 00:00"));
// console.log(moment().format("YYYY-MM-DD"));

const talkServer = {
    service: function (event) {
        // console.log(event);
        const regExp = /^B_[0-9]{4}$/;
        if (regExp.test(event)) {
            //Account Binding
            return this.UserInsights(event, true);
        }
        console.log("Not Insight");
        return new Promise((resolve) => {
            Monday(event).then(data => {
                console.log("Monday(event)");
                console.log(data);
                const objType = typeof(data);
                if (objType === "object") {
                    UserDetailed = data[0];
                    // console.log(UserDetailed);
                    resolve (talkEntity.getBasicInfos(UserDetailed.Balance));
                } else if (objType === "string") {
                    switch (data) {
                        case commonEntity.getMonReceipts():
                            console.log(UserDetailed);
                            resolve(talkEntity.getMonReceiptsInfos(UserDetailed));
                            break;
                        case commonEntity.getMonEvents():
                            resolve(talkEntity.getMonEventsInfos('10800'));
                            break;
                    }
                }
            });
        });
        // return new Promise((resolve, reject) => {
            // if (event === "deposit and withdrawal") {
            //     resolve([
            //         talk.detailedOfWeek(
            //             datetime.format("YYYY-MM-DD"),
            //             datetime.format("dd"),
            //             UserDetailed[0].Salary, UserDetailed[0].Rent, UserDetailed[0].Deduction
            //         ),
            //         talk.Recommend(UserDetailed[0].Income)
            //     ]);
            // } else if (event === "info event") {
            //     resolve(talk.thisWeekEvent(datetime.format("YYYY-MM-DD"), datetime.format("dd"), '10800'));
            // }

        // });
        // return new Promise((resolve, reject) => {
        //     Monday(event).then(data => {
        //         switch (event) {
        //             case "aiko":
        //                 resolve ([
        //                     talk.firstTimeEntity(data[0].Balance),
        //                     talk.receiptsOfWeek()
        //                 ]);
        //                 break;
        //             case 'OK':
        //                 resolve([
        //                     talk.detailedOfWeek(
        //                         monment.format("YYYY-MM-DD"),
        //                         monment.format("dd"),
        //                         data[0].Salary, data[0].Rent, data[0].Deduction
        //                     ),
        //                     talk.Recommend(data[0].Income)
        //                 ]);
        //                 break;
        //             case 'events':
        //                 resolve(talk.thisWeekEvent(monment.format("YYYY-MM-DD"), monment.format("dd"), '10800'));
        //                 break;
        //             default:
        //                 reject(event);
        //         }
        //     })
        // });
    },
    UserInsights: function (event, isUserId) {
        const date = commonEntity.dateTime("MM/DD/YYYY 00:00");
        const langId = commonEntity.getInsightLangId();
        console.log(langId);
        if (isUserId) {
            return insightApi.GetInsights(event, date, langId).then(data => {
                return insightFlex.parseEntity(data);
            }).catch(function (err) {
                console.log(err);
            });
        }
        const userId = "B_2307";
        return insightApi.GetInsights(userId, date, langId).then(data => {
            return insightFlex.parseEntity(data);
        });
    },
    Wednesday: function () {
        return new Promise(resolve => {
            console.log(UserDetailed);
            const objs = {};
            objs.rent = {
                rent: UserDetailed.Rent,
                date: {format: "M", others: {amount:1, dateCode: "M", sub: true}}
            };
            objs.yearsLoan = {
                birthDate: UserDetailed.BirthDate,
                rent: UserDetailed.Rent
            };
            objs.yearsFromNow = {
                birthDate: UserDetailed.BirthDate,
                rent: UserDetailed.Rent
            };
            objs.paymentDueTo = {
                birthDate: UserDetailed.BirthDate,
                rent: UserDetailed.Rent,
                borrowedAmount: UserDetailed.BorrowedAmount
            };
            resolve(talkEntity.getWedRentLoanInfos(objs));
        });
    }
};

function Monday(event) {
    if(event === 'aiko') {
        const userId = 1;
        return dataAccess.Monday(userId);
    } else if(event === 'kennji') {
        const userId = 2;
        return dataAccess.Monday(userId);
    } else if(event === 'hiroshi') {
        const userId = 3;
        return dataAccess.Monday(userId);
    } else if(event === 'kaori') {
        const userId = 4;
        return dataAccess.Monday(userId);
    } else {
        return new Promise(resolve => {
            resolve(event);
        });
    }
}

// const service = {
//     Monday: function (event) {
//         Monday(event).then(data => {
//             let day = "日月火水木金土".charAt(new Date().getDay());
//             UserDetailed = data;
//             let date = new Date();
//             const years = date.getFullYear();
//             let month = date.getMonth();
//             const days = date.getDay();
//
//             const nowDate = years + '-' + month + '-' + days;
//             switch (event) {
//                 case 'aiko':
//                     return [
//                         talk.firstTimeEntity(UserDetailed[0].Balance),
//                         talk.receiptsOfWeek()
//                     ];
//                 case 'OK':
//                     return [
//                         talk.detailedOfWeek(nowDate, day, UserDetailed[0].Salary, UserDetailed[0].Rent, UserDetailed[0].Deduction),
//                         talk.Recommend(UserDetailed[0].Income)
//                     ];
//                 case 'events':
//                     return talk.thisWeekEvent(nowDate, day, '10800');
//             }
//         }).catch(err => {
//             console.log(err);
//         });
//     },
//     Wednesday: function (text, callback) {
//         let day = "日月火水木金土".charAt(new Date().getDay());
//         UserDetailed = data;
//         let date = new Date();
//         const years = date.getFullYear();
//         let month = date.getMonth();
//         const days = date.getDay();
//
//         const nowDate = years + '-' + month + '-' + days;
//
//         if(UserDetailed !== null) {
//             return [
//                 talk.firstTimeEntity(UserDetailed[0].Balance),
//                 talk.receiptsOfWeek()
//             ];
//         }
//         switch (event) {
//             case 'OK':
//                 return [
//                     talk.detailedOfWeek(nowDate, day, UserDetailed[0].Salary, UserDetailed[0].Rent, UserDetailed[0].Deduction),
//                     talk.Recommend(UserDetailed[0].Income)
//                 ];
//             case 'events':
//                 return talk.thisWeekEvent(nowDate, day, '10800');
//             case '水曜日':
//                 const frontMonth = getPreMonth(month);
//                 const rent = frontTwoSubstring(UserDetailed[0].Rent);
//                 const age = getAge(UserDetailed[0].BirthDate.getFullYear(), years);
//                 const loanYear = getLoanYears(age);
//                 const loan = loanMoney(UserDetailed[0].Rent, loanYear);
//                 const oldLoanYear = getTenLoanYears(age);
//                 const borrowedAmount = formatCurrencyT(frontSubstring(UserDetailed[0].BorrowedAmount));
//                 const oldLoanSunMoney = loanMoney(UserDetailed[0].Rent, oldLoanYear);
//                 const oldAge = getOldAge(age);
//                 const tenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, loanYear));
//                 const remainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, loanYear));
//                 const oldTenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
//                 const oldRemainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
//                 const forties = ageRange(age);
//
//                 return [
//                     wed.rentText(frontMonth, rent),
//                     wed.maxYearsLoan(loanYear, loan),
//                     wed.tenYearsFromNow(oldAge, oldLoanYear, rent, oldLoanSunMoney),
//                     wed.paymentDueToAgeChange(borrowedAmount, age, oldAge, loanYear,
//                         oldLoanYear, tenThousand, remainingSum, oldTenThousand, oldRemainingSum, forties),
//                     wed.Consultation()
//                 ];
//
//         }
//     }
// };

    // const frontMonth = getPreMonth(month);
    // const rent = frontTwoSubstring(UserDetailed[0].Rent);
    // const age = getAge(UserDetailed[0].BirthDate.getFullYear(), years);
    // const loanYear = getLoanYears(age);
    // const loan = loanMoney(UserDetailed[0].Rent, loanYear);
    // const oldLoanYear = getTenLoanYears(age);
    // const borrowedAmount = formatCurrencyT(frontSubstring(UserDetailed[0].BorrowedAmount));
    // const oldLoanSunMoney = loanMoney(UserDetailed[0].Rent, oldLoanYear);
    // const oldAge = getOldAge(age);
    // const tenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, loanYear));
    // const remainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, loanYear));
    // const oldTenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
    // const oldRemainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
    // const forties = ageRange(age);
    // console.log(JSON.stringify(talk.thisWeekEvent("", day, '10800')));
// callback(talk.thisWeekEvent(nowDate, day, '10800'));
// callback([
//     wed.rentText(frontMonth, rent),
//     wed.maxYearsLoan(loanYear, loan),
//     wed.tenYearsFromNow(oldAge, oldLoanYear, rent, oldLoanSunMoney),
//     wed.paymentDueToAgeChange(borrowedAmount, age, oldAge, loanYear,
//         oldLoanYear, tenThousand, remainingSum, oldTenThousand, oldRemainingSum, forties),
//     wed.Consultation()
// ]);
// };

// function talkServer(event) {
//     Monday(event).then(data => {
//         let day = "日月火水木金土".charAt(new Date().getDay());
//         UserDetailed = data;
//         let date = new Date();
//         const years = date.getFullYear();
//         let month = date.getMonth();
//         const days = date.getDay();
//
//         const nowDate = years + '-' + month + '-' + days;
//         switch (event) {
//             case 'aiko':
//                 return [
//                     talk.firstTimeEntity(UserDetailed[0].Balance),
//                     talk.receiptsOfWeek()
//                 ];
//             case 'OK':
//                 return [
//                     talk.detailedOfWeek(nowDate, day, UserDetailed[0].Salary, UserDetailed[0].Rent, UserDetailed[0].Deduction),
//                     talk.Recommend(UserDetailed[0].Income)
//                 ];
//             case 'events':
//                 return talk.thisWeekEvent(nowDate, day, '10800');
//             case '水曜日':
//                 const frontMonth = getPreMonth(month);
//                 const rent = frontTwoSubstring(UserDetailed[0].Rent);
//                 const age = getAge(UserDetailed[0].BirthDate.getFullYear(), years);
//                 const loanYear = getLoanYears(age);
//                 const loan = loanMoney(UserDetailed[0].Rent, loanYear);
//                 const oldLoanYear = getTenLoanYears(age);
//                 const borrowedAmount = formatCurrencyT(frontSubstring(UserDetailed[0].BorrowedAmount));
//                 const oldLoanSunMoney = loanMoney(UserDetailed[0].Rent, oldLoanYear);
//                 const oldAge = getOldAge(age);
//                 const tenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, loanYear));
//                 const remainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, loanYear));
//                 const oldTenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
//                 const oldRemainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
//                 const forties = ageRange(age);
//
//                 return [
//                     wed.rentText(frontMonth, rent),
//                     wed.maxYearsLoan(loanYear, loan),
//                     wed.tenYearsFromNow(oldAge, oldLoanYear, rent, oldLoanSunMoney),
//                     wed.paymentDueToAgeChange(borrowedAmount, age, oldAge, loanYear,
//                         oldLoanYear, tenThousand, remainingSum, oldTenThousand, oldRemainingSum, forties),
//                     wed.Consultation()
//                 ];
//         }
//     }).catch(err => {
//         console.log(err);
//     });
// }

// /**
//  * 指定時間を取得するの方法
//  * @author li yuyan
//  * @date 2019-3-13
//  * @param format 日付フォマート
//  * @param amount
//  * @param dateCode
//  * @returns {string}
//  */
// function dateTime(format, amount, dateCode) {
//     const date = moment();
//     if (dateCode === "Y") {
//         date.subtract(amount, 'years');
//     } else if (dateCode === "M") {
//         date.subtract(amount, 'months');
//     } else if (dateCode === "D") {
//         date.subtract(amount, 'days');
//     }
//     return date.format(format);
// }

// /**
//  * 分位符を添加するの方法
//  * @author li long
//  * @date 2019-3-11
//  * @param num 数
//  * @returns {string}
//  */
// function formatCurrencyT(num) {
//     let result = '', counter = 0;
//     let mstr = '';
//     let minus = '';
//     if (num < 0) {
//         num = num * -1;
//         minus = '-';
//     }
//
//     const str = Math.floor(num).toString();
//     for (let i = str.length - 1; i >= 0; i--) {
//         counter++;
//         result = str.charAt(i) + result;
//         if (!(counter % 3) && i !== 0) {
//             result = ',' + result;
//         }
//     }
//     return minus + result + mstr;
//
// }

// /**
//  * 削除後4しよ桁の方法
//  * @author li long
//  * @date 2019-3-11
//  * @param num 数
//  * @returns {string}
//  */
// function frontSubstring(num) {
//
//     return num.substring(0, num.length - 4);
// }

// /**
//  * 取得後4桁の方法
//  * @author li long
//  * @date 2019-3-11
//  * @param num 数
//  * @returns {string}
//  */
// function afterSubstring(num) {
//     num = num.toString();
//     return num.substring(num.length - 4, num.length);
// }
//
//
// function amountFormat(num) {
//     num = num / 10000;
//     return num > 0 ? num : -num;
// }

// /**
//  * 取得前2桁の方法
//  * @author li long
//  * @date 2019-3-11
//  * @param num 数
//  * @returns {string}
//  */
// function frontTwoSubstring(num) {
//     num = num / 10000;
//     return num > 0 ? num : -num;
// }
//
// /**
//  * 取得前の月
//  * @author li long
//  * @date 2019-3-11
//  * @param month 月
//  * @returns {number}
//  */
// function getPreMonth(month) {
//     if(month - 1 === 0) {
//         month = 12;
//         return month;
//     } else {
//         return month - 1;
//     }
// }

// /**
//  * 年齢の計算
//  * @author li long
//  * @date 2019-3-11
//  * @param birthDate 誕生日
//  * @returns {number}
//  */
// function getAge(birthDate) {
//     return parseInt(moment(birthDate, "YYYY").fromNow().substr(0,2));
// }
//
// /**
//  * 10年後の年齢
//  * @author li long
//  * @date 2019-3-11
//  * @param age 年齢
//  * @returns {*}
//  */
// function getOldAge(age) {
//     return age + 10;
// }

// /**
//  * ローンシミュレーションの借金年限
//  * @author li long
//  * @date 2019-3-11
//  * @param age 年齢
//  * @returns {number}
//  */
// function getLoanYears(age) {
//     if(age + 35 > 69) {
//         return 69 - age;
//     } else {
//         return 35;
//     }
// }
//
// /**
//  * 10年後のローンシミュレーションの借金年限
//  * @author li long
//  * @date 2019-3-11
//  * @param age 年齢
//  * @returns {number}
//  */
// function getTenLoanYears(age) {
//     if((age + 10) + 35 > 69) {
//         return 69 - (age + 10);
//     } else {
//         return 35;
//     }
// }

// /**
//  * ローンシミュレーションの借入金
//  * @author li long
//  * @date 2019-3-11
//  * @param rent 家賃
//  * @param loanYear ローンシミュレーションの借入年限
//  * @returns {number}
//  */
// function loanMoney(rent, loanYear) {
//     return rent * (Math.pow(1 + interest, loanYear * 12) - 1) / interest * Math.pow(1 + interest, loanYear * 12);
// }

// /**
//  * 毎月返済額
//  * @author li long
//  * @date 2019-3-11
//  * @param borrowedAmount 借入金額
//  * @param loanYear 借金年限
//  * @returns {number}
//  */
// function loanMonthRemaining(borrowedAmount, loanYear) {
//     return borrowedAmount * interest * Math.pow(1 + interest, loanYear * 12) / (Math.pow(1 + interest, loanYear * 12) - 1);
// }

// /**
//  * 何代を計算する
//  * @author li long
//  * @date 2019-3-11
//  * @param age 年齢
//  * @returns {number}
//  */
// function ageRange(age) {
//     if (age >= 20) {
//         if (age < 30) {
//             return 20;
//         } else if (age < 40) {
//             return 30;
//         } else if (age < 50) {
//             return 40;
//         } else if (age < 60) {
//             return 50;
//         } else if (age < 70) {
//             return 60;
//         }
//     }
// }

module.exports = talkServer;