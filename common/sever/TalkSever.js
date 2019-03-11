let mantalkEntity = require('../entity/MondayTalkEntity');
let wedtalkEntity = require('../entity/WednesdayTalkEntity');
let MondayDataAccess = require('../dataAccess/MondayDataAccess');
let UserDetailed = require('../entity/UserDetailed');
let talk = new mantalkEntity();
let wed = new wedtalkEntity();
let dataAccess = new MondayDataAccess();

let interest = 0.00133;

function talkServer(event) {
    Monday(event).then(data => {
        let day = "日月火水木金土".charAt(new Date().getDay());
        UserDetailed = data;
        let date = new Date();
        const years = date.getFullYear();
        let month = date.getMonth();
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
                const frontMonth = getPreMonth(month);
                const rent = frontTwoSubstring(UserDetailed[0].Rent);
                const age = getAge(UserDetailed[0].BirthDate.getFullYear(), years);
                const loanYear = getLoanYears(age);
                const loan = loanMoney(UserDetailed[0].Rent, loanYear);
                const oldLoanYear = getTenLoanYears(age);
                const borrowedAmount = formatCurrencyT(frontSubstring(UserDetailed[0].BorrowedAmount));
                const oldLoanSunMoney = loanMoney(UserDetailed[0].Rent, oldLoanYear);
                const oldAge = getOldAge(age);
                const tenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, loanYear));
                const remainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, loanYear));
                const oldTenThousand = frontTwoSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
                const oldRemainingSum = afterSubstring(loanMonthRemaining(borrowedAmount, oldLoanYear));
                const forties = ageRange(age);

                return [
                    wed.rentText(frontMonth, rent),
                    wed.maxYearsLoan(loanYear, loan),
                    wed.tenYearsFromNow(oldAge, oldLoanYear, rent, oldLoanSunMoney),
                    wed.paymentDueToAgeChange(borrowedAmount, age, oldAge, loanYear,
                        oldLoanYear, tenThousand, remainingSum, oldTenThousand, oldRemainingSum, forties),
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

/**
 * 分位符を添加するの方法
 * @author li long
 * @date 2019-3-11
 * @param num 数
 * @returns {string}
 */
function formatCurrencyT(num) {
    let result = '', counter = 0;
    let mstr = '';
    let minus = '';
    if (num < 0) {
        num = num * -1;
        minus = '-';
    }

    const str = Math.floor(num).toString();
    for (let i = str.length - 1; i >= 0; i--) {
        counter++;
        result = str.charAt(i) + result;
        if (!(counter % 3) && i !== 0) {
            result = ',' + result;
        }
    }
    return minus + result + mstr;

}

/**
 * 削除後4しよ桁の方法
 * @author li long
 * @date 2019-3-11
 * @param num 数
 * @returns {string}
 */
function frontSubstring(num) {

    return num.substring(0, num.length - 4);
}

/**
 * 取得後4桁の方法
 * @author li long
 * @date 2019-3-11
 * @param num 数
 * @returns {string}
 */
function afterSubstring(num) {
    return num.substring(num.length - 4, num.length);
}

/**
 * 取得前2桁の方法
 * @author li long
 * @date 2019-3-11
 * @param num 数
 * @returns {string}
 */
function frontTwoSubstring(num) {
    return num.substring(0, num.length - 4);
}

/**
 * 取得前の月
 * @author li long
 * @date 2019-3-11
 * @param month 月
 * @returns {number}
 */
function getPreMonth(month) {
    if(month - 1 === 0) {
        month = 12;
        return month;
    } else {
        return month - 1;
    }
}

/**
 * 年齢の計算
 * @author li long
 * @date 2019-3-11
 * @param birthDate 誕生日
 * @param years 今の年
 * @returns {number}
 */
function getAge(birthDate, years) {
    return years - birthDate;
}

/**
 * 10年後の年齢
 * @author li long
 * @date 2019-3-11
 * @param age 年齢
 * @returns {*}
 */
function getOldAge(age) {
    return age + 10;
}

/**
 * ローンシミュレーションの借金年限
 * @author li long
 * @date 2019-3-11
 * @param age 年齢
 * @returns {number}
 */
function getLoanYears(age) {
    if(age + 35 > 69) {
        return 69 - age;
    } else {
        return 35;
    }
}

/**
 * 10年後のローンシミュレーションの借金年限
 * @author li long
 * @date 2019-3-11
 * @param age 年齢
 * @returns {number}
 */
function getTenLoanYears(age) {
    if((age + 10) + 35 > 69) {
        return 69 - (age + 10);
    } else {
        return 35;
    }
}

/**
 * ローンシミュレーションの借入金
 * @author li long
 * @date 2019-3-11
 * @param rent 家賃
 * @param loanYear ローンシミュレーションの借入年限
 * @returns {number}
 */
function loanMoney(rent, loanYear) {
    return rent * (Math.pow(1 + interest, loanYear * 12) - 1) / interest * Math.pow(1 + interest, loanYear * 12);
}

/**
 * 毎月返済額
 * @author li long
 * @date 2019-3-11
 * @param borrowedAmount 借入金額
 * @param loanYear 借金年限
 * @returns {number}
 */
function loanMonthRemaining(borrowedAmount, loanYear) {
    return borrowedAmount * interest * Math.pow(1 + interest, loanYear * 12) / (Math.pow(1 + interest, loanYear * 12) - 1);
}

/**
 * 何代を計算する
 * @author li long
 * @date 2019-3-11
 * @param age 年齢
 * @returns {number}
 */
function ageRange(age) {
    if (30 > age >= 20) {
        return 20;
    } else if (40 > age >= 30) {
        return 30
    } else if (50 > age >= 40) {
        return 40;
    } else if (60 > age >= 50) {
        return 50;
    } else if (70 > age >= 60) {
        return 60;
    }
}

module.exports = talkServer;