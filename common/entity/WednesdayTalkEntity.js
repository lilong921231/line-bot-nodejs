const commonEntity = require('./CommonEntity');

// const htmlUrl = commonEntity.staticPath + "html/webPage.html";
const htmlUrl = commonEntity.staticPath + "openApp?ipAddress=" + commonEntity.staticPath + "&userId=";

let interest = 0.00133;

/**
 * 水曜日に表示する情報クラス
 * @author li long
 * @date 2019-3-4
 */

const WednesdayTalkEntity = {

    /**
     * rent Text
     * @param infos infos{date: {}, rent: number}
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    rentText(infos) {
        const month = commonEntity.dateTime(infos.date.format, infos.date.others);
        const rent = commonEntity.amountConversion(infos.rent);
        const entity = {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": month + "月の家賃"
                        },
                        {
                            "type": "text",
                            "text": rent + "万円",
                            "align": "center",
                            "weight": "bold"
                        },
                        {
                            "type": "text",
                            "text": "の引き落としが完了しました"
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
        return entity;
    },

    /**
     * Maximum personal borrowing
     * @param infos infos{birthDate: string, rent: number}
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    maxYearsLoan(infos) {
        const loanYears = getLoanYears(commonEntity.getUserAge(infos.birthDate));
        const entity = {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "現在の家賃と同等の月々返済額で、" + loanYears + "年ローンをお借りする場合、一般的に",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": commonEntity.formatCurrencyT(commonEntity.amountConversion(loanMoney(infos.rent, loanYears))) + "万円",
                            "align": "center",
                            "weight": "bold"
                        },
                        {
                            "type": "text",
                            "text": "の借入可能枠となります。"
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
        return entity;
    },

    /**
     * Loan calculation 10 years later
     * @param infos infos{birthDate: string, rent: number}
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    tenYearsFromNow(infos) {
        const oldAge = commonEntity.getOldAge(commonEntity.getUserAge(infos.birthDate), 10);
        const loanYears = getLoanYears(oldAge);
        const entity = {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "10年後" + oldAge + "歳となるあなたにとって、お勧めとなるご返済期間が" + loanYears +
                                "年となります。同じように月々の返済額が" + commonEntity.amountConversion(infos.rent) + "万円ですと、一般的に、",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": commonEntity.formatCurrencyT(commonEntity.amountConversion(loanMoney(infos.rent, loanYears))) + "万円",
                            "align": "center",
                            "weight": "bold"
                        },
                        {
                            "type": "text",
                            "text": "の借入可能枠となります。"
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
        return entity;
    },

    /**
     * The same amount of money borrowed, the monthly refund of different ages
     * @param infos
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    paymentDueToAgeChange(infos) {
        const borrow = commonEntity.amountConversion(infos.borrowedAmount);
        const userAge = commonEntity.getUserAge(infos.birthDate);
        const userAgeLoanYears = getLoanYears(userAge);
        const oldAge = commonEntity.getOldAge(userAge, 10);
        const oldAgeLoanYears = getLoanYears(oldAge);
        const nowLoanMonthRemaining = loanMonthRemaining(infos.borrowedAmount, userAgeLoanYears);
        const yearsLoanMonthRemaining = loanMonthRemaining(infos.borrowedAmount, oldAgeLoanYears);
        const entity= {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "同じ借入枠で返済期間が違う場合の毎月の返済額も違います。",
                            "wrap": true
                        },
                        {
                            "type": "separator",
                            "margin": "sm",
                            "color": "#FFFFFF"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "借入枠",
                                            "flex": 2,
                                            "size": "xxs",
                                            "align": "center"
                                        },
                                        {
                                            "type": "text",
                                            "text": "借入時の年齢",
                                            "flex": 3,
                                            "size": "xxs",
                                            "align": "center"
                                        },
                                        {
                                            "type": "text",
                                            "text": "返済期間",
                                            "flex": 2,
                                            "size": "xxs",
                                            "align": "center"
                                        },
                                        {
                                            "type": "text",
                                            "text": "毎月の返済額",
                                            "flex": 3,
                                            "size": "xxs",
                                            "align": "center"
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "horizontal",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "horizontal",
                                            "flex": 2,
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text":  commonEntity.formatCurrencyT(borrow) + "\n万円",
                                                    "size": "xxs",
                                                    "align": "center",
                                                    "gravity": "center",
                                                    "wrap": true
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "flex": 3,
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": userAge + "歳",
                                                    "size": "xxs",
                                                    "align": "center"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": oldAge + "歳",
                                                    "size": "xxs",
                                                    "align": "center"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "flex": 2,
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": userAgeLoanYears + "年",
                                                    "size": "xxs",
                                                    "align": "center"
                                                },
                                                {
                                                    "type": "text",
                                                    // "text": getLoanYears(oldAge) + "25年",
                                                    "text": oldAgeLoanYears + "年",
                                                    "size": "xxs",
                                                    "align": "center"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "vertical",
                                            "flex": 3,
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": commonEntity.amountConversion(nowLoanMonthRemaining, true)+ "万" +
                                                        afterSubstring(nowLoanMonthRemaining) + "円",
                                                    "size": "xxs",
                                                    "align": "center"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": commonEntity.amountConversion(yearsLoanMonthRemaining, true) + "万" +
                                                        afterSubstring(yearsLoanMonthRemaining) + "円",
                                                    "size": "xxs",
                                                    "align": "center"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "separator",
                            "margin": "sm",
                            "color": "#FFFFFF"
                        },
                        {
                            "type": "text",
                            "text": "一般的に、",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "マイホームを早く購入すれば返済期間を長くでき、その分月々の返済額が抑えられます。",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": getRangeOfAge(userAge) +"代になるあなたにとって、子供の教育費、老後への備え、親の介護などにもお金が必要になる時期です。",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "住宅費で節約できたお金は少しでも家計のお助けとなります！",
                            "wrap": true
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
        return entity;
    },

    Consultation() {
        const entity = {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "家計を圧迫することなく、",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "夢のマイホームが購入できるかも・・・！",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "これからのライフプラン、マネープランを含めて、対面で、ファイナンシャルアドバイザーに相談してみませんか？",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": "今すぐに相談可能な、お近くの店舗をご紹介することも可能です。",
                            "wrap": true
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "button",
                            "action": {
                                "type": "uri",
                                "label": "相談する",
                                "uri": htmlUrl + commonEntity.getUserId(commonEntity.getUserAccount())
                            }
                        },
                        {
                            "type": "button",
                            "action": {
                                "type": "message",
                                "label": "また今度にする",
                                "text": "また今度にする"
                            }
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
        return entity;
    }
};

/**
 * 何代を計算する
 * @author li long
 * @date 2019-3-11
 * @param age 年齢
 * @returns {number}
 */
function getRangeOfAge(age) {
    if (age >= 20) {
        if (age < 30) {
            return 20;
        } else if (age < 40) {
            return 30;
        } else if (age < 50) {
            return 40;
        } else if (age < 60) {
            return 50;
        } else if (age < 70) {
            return 60;
        }
    }
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
    return parseInt(borrowedAmount * interest * Math.pow(1 + interest, loanYear * 12) / (Math.pow(1 + interest, loanYear * 12) - 1));
}

/**
 * 取得後4桁の方法
 * @author li long
 * @date 2019-3-11
 * @param number 数
 * @returns {string}
 */
function afterSubstring(number) {
    return number % 10000;
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
    rent = commonEntity.amountValue(rent);
    // console.log(rent);
    // console.log(loanYear);
    // console.log(rent * (Math.pow(1 + interest, loanYear * 12) - 1) / Math.pow(1 + interest, loanYear * 12) / interest);
    return parseInt(rent * (Math.pow(1 + interest, loanYear * 12) - 1) / Math.pow(1 + interest, loanYear * 12) / interest);
}

/**
 * ローンシミュレーションの借金年限
 * @author li long
 * @date 2019-3-11
 * @param userAge 年齢
 * @returns {number}
 */
function getLoanYears(userAge) {
    if(userAge + 35 > 69) {
        return 69 - userAge;
    } else {
        return 35;
    }
}

// class WednesdayTalkEntity {
//
//     /**
//      * rent Text
//      * @param month month
//      * @param rent rentMoney
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
//      */
//     rentText(month, rent) {
//         const entity = {
//             "type": "flex",
//             "altText": "Flex Message",
//             "contents": {
//                 "type": "bubble",
//                 "direction": "ltr",
//                 "body": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                         {
//                             "type": "text",
//                             "text": month + "月の家賃"
//                         },
//                         {
//                             "type": "text",
//                             "text": rent + "万円",
//                             "align": "center",
//                             "weight": "bold"
//                         },
//                         {
//                             "type": "text",
//                             "text": "の引き落としが完了しました"
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
//         return entity;
//     }
//
//     /**
//      * Maximum personal borrowing
//      * @param age age
//      * @param loan maxLoan
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
//      */
//     maxYearsLoan(age, loan) {
//         const entity = {
//             "type": "flex",
//             "altText": "Flex Message",
//             "contents": {
//                 "type": "bubble",
//                 "direction": "ltr",
//                 "body": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                         {
//                             "type": "text",
//                             "text": "現在の家賃と同等の月々返済額で、" + age + "年ローンをお借りする場合、一般的に",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": loan + "万円",
//                             "align": "center",
//                             "weight": "bold"
//                         },
//                         {
//                             "type": "text",
//                             "text": "の借入可能枠となります。"
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
//         return entity;
//     }
//
//     /**
//      * Loan calculation 10 years later
//      * @param age add Ten Years Of Age
//      * @param loan Maximum loan life in 10 years
//      * @param repayment monthly Repayment
//      * @param totalLoan Total loan amount
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
//      */
//     tenYearsFromNow(age, loan, repayment, totalLoan) {
//         const entity = {
//             "type": "flex",
//             "altText": "Flex Message",
//             "contents": {
//                 "type": "bubble",
//                 "direction": "ltr",
//                 "body": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                         {
//                             "type": "text",
//                             "text": "10年後" + age + "歳となるあなたにとって、お勧めとなるご返済期間が" + loan +
//                                 "年となります。同じように月々の返済額が" + repayment + "万円ですと、一般的に、",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": totalLoan + "万円",
//                             "align": "center",
//                             "weight": "bold"
//                         },
//                         {
//                             "type": "text",
//                             "text": "の借入可能枠となります。"
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
//         return entity;
//     }
//
//     /**
//      * The same amount of money borrowed, the monthly refund of different ages
//      * @param loan
//      * @param age
//      * @param addTenYearsOfAge
//      * @param maxYears
//      * @param surplusYears
//      * @param tenThousand
//      * @param remainingSum
//      * @param oldTenThousand
//      * @param oldRemainingSum
//      * @param forties
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
//      */
//     paymentDueToAgeChange(loan, age, addTenYearsOfAge, maxYears, surplusYears, tenThousand, remainingSum, oldTenThousand, oldRemainingSum, forties) {
//         const entity= {
//             "type": "flex",
//             "altText": "Flex Message",
//             "contents": {
//                 "type": "bubble",
//                 "direction": "ltr",
//                 "body": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                         {
//                             "type": "text",
//                             "text": "同じ借入枠で返済期間が違う場合の毎月の返済額も違います。",
//                             "wrap": true
//                         },
//                         {
//                             "type": "separator",
//                             "margin": "sm",
//                             "color": "#FFFFFF"
//                         },
//                         {
//                             "type": "box",
//                             "layout": "vertical",
//                             "contents": [
//                                 {
//                                     "type": "box",
//                                     "layout": "horizontal",
//                                     "contents": [
//                                         {
//                                             "type": "text",
//                                             "text": "借入枠",
//                                             "flex": 2,
//                                             "size": "xxs",
//                                             "align": "center"
//                                         },
//                                         {
//                                             "type": "text",
//                                             "text": "借入時の年齢",
//                                             "flex": 3,
//                                             "size": "xxs",
//                                             "align": "center"
//                                         },
//                                         {
//                                             "type": "text",
//                                             "text": "返済期間",
//                                             "flex": 2,
//                                             "size": "xxs",
//                                             "align": "center"
//                                         },
//                                         {
//                                             "type": "text",
//                                             "text": "毎月の返済額",
//                                             "flex": 3,
//                                             "size": "xxs",
//                                             "align": "center"
//                                         }
//                                     ]
//                                 },
//                                 {
//                                     "type": "box",
//                                     "layout": "horizontal",
//                                     "contents": [
//                                         {
//                                             "type": "box",
//                                             "layout": "horizontal",
//                                             "flex": 2,
//                                             "contents": [
//                                                 {
//                                                     "type": "text",
//                                                     "text":  loan + "\n万円",
//                                                     "size": "xxs",
//                                                     "align": "center",
//                                                     "gravity": "center",
//                                                     "wrap": true
//                                                 }
//                                             ]
//                                         },
//                                         {
//                                             "type": "box",
//                                             "layout": "vertical",
//                                             "flex": 3,
//                                             "contents": [
//                                                 {
//                                                     "type": "text",
//                                                     "text": age + "歳",
//                                                     "size": "xxs",
//                                                     "align": "center"
//                                                 },
//                                                 {
//                                                     "type": "text",
//                                                     "text": addTenYearsOfAge + "歳",
//                                                     "size": "xxs",
//                                                     "align": "center"
//                                                 }
//                                             ]
//                                         },
//                                         {
//                                             "type": "box",
//                                             "layout": "vertical",
//                                             "flex": 2,
//                                             "contents": [
//                                                 {
//                                                     "type": "text",
//                                                     "text": maxYears + "年",
//                                                     "size": "xxs",
//                                                     "align": "center"
//                                                 },
//                                                 {
//                                                     "type": "text",
//                                                     "text": surplusYears + "25年",
//                                                     "size": "xxs",
//                                                     "align": "center"
//                                                 }
//                                             ]
//                                         },
//                                         {
//                                             "type": "box",
//                                             "layout": "vertical",
//                                             "flex": 3,
//                                             "contents": [
//                                                 {
//                                                     "type": "text",
//                                                     "text": tenThousand+ "万" + remainingSum + "円",
//                                                     "size": "xxs",
//                                                     "align": "center"
//                                                 },
//                                                 {
//                                                     "type": "text",
//                                                     "text": oldTenThousand + "万" + oldRemainingSum + "円",
//                                                     "size": "xxs",
//                                                     "align": "center"
//                                                 }
//                                             ]
//                                         }
//                                     ]
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "separator",
//                             "margin": "sm",
//                             "color": "#FFFFFF"
//                         },
//                         {
//                             "type": "text",
//                             "text": "一般的に、",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": "マイホームを早く購入すれば返済期間を長くでき、その分月々の返済額が抑えられます。",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": forties +"代になるあなたにとって、子供の教育費、老後への備え、親の介護などにもお金が必要になる時期です。",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": "住宅費で節約できたお金は少しでも家計のお助けとなります！",
//                             "wrap": true
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
//         return entity;
//     }
//
//     Consultation() {
//         const entity = {
//             "type": "flex",
//             "altText": "Flex Message",
//             "contents": {
//                 "type": "bubble",
//                 "direction": "ltr",
//                 "body": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                         {
//                             "type": "text",
//                             "text": "家計を圧迫することなく、",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": "夢のマイホームが購入できるかも・・・！",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": "これからのライフプラン、マネープランを含めて、対面で、ファイナンシャルアドバイザーに相談してみませんか？",
//                             "wrap": true
//                         },
//                         {
//                             "type": "text",
//                             "text": "今すぐに相談可能な、お近くの店舗をご紹介することも可能です。",
//                             "wrap": true
//                         }
//                     ]
//                 },
//                 "footer": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                         {
//                             "type": "button",
//                             "action": {
//                                 "type": "uri",
//                                 "label": "相談する",
//                                 "uri": htmlUrl
//                             }
//                         },
//                         {
//                             "type": "button",
//                             "action": {
//                                 "type": "message",
//                                 "label": "また今度にする",
//                                 "text": "また今度にする"
//                             }
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
//         return entity;
//     }
// }

module.exports = WednesdayTalkEntity;