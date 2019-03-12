const staticPath = require('./MondayTalkEntity').staticPath;

const htmlUrl = staticPath + "html/webPage.html";

/**
 * 水曜日に表示する情報クラス
 * @author li long
 * @date 2019-3-4
 */

class WednesdayTalkEntity {

    /**
     * rent Text
     * @param month month
     * @param rent rentMoney
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    rentText(month, rent) {
        return {
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
        }
    }

    /**
     * Maximum personal borrowing
     * @param age age
     * @param loan maxLoan
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    maxYearsLoan(age, loan) {
        return {
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
                            "text": "現在の家賃と同等の月々返済額で、" + age + "年ローンをお借りする場合、一般的に",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": loan + "万円",
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
        }
    }

    /**
     * Loan calculation 10 years later
     * @param age add Ten Years Of Age
     * @param loan Maximum loan life in 10 years
     * @param repayment monthly Repayment
     * @param totalLoan Total loan amount
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    tenYearsFromNow(age, loan, repayment, totalLoan) {
        return {
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
                            "text": "10年後" + age + "歳となるあなたにとって、お勧めとなるご返済期間が" + loan +
                                "年となります。同じように月々の返済額が" + repayment + "万円ですと、一般的に、",
                            "wrap": true
                        },
                        {
                            "type": "text",
                            "text": totalLoan + "万円",
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
        }
    }

    /**
     * The same amount of money borrowed, the monthly refund of different ages
     * @param loan
     * @param age
     * @param addTenYearsOfAge
     * @param maxYears
     * @param surplusYears
     * @param tenThousand
     * @param remainingSum
     * @param oldTenThousand
     * @param oldRemainingSum
     * @param forties
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    paymentDueToAgeChange(loan, age, addTenYearsOfAge, maxYears, surplusYears, tenThousand, remainingSum, oldTenThousand, oldRemainingSum, forties) {
        return {
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
                                                    "text":  loan + "\n万円",
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
                                                    "text": age + "歳",
                                                    "size": "xxs",
                                                    "align": "center"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": addTenYearsOfAge + "歳",
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
                                                    "text": maxYears + "年",
                                                    "size": "xxs",
                                                    "align": "center"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": surplusYears + "25年",
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
                                                    "text": tenThousand+ "万" + remainingSum + "円",
                                                    "size": "xxs",
                                                    "align": "center"
                                                },
                                                {
                                                    "type": "text",
                                                    "text": oldTenThousand + "万" + oldRemainingSum + "円",
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
                            "text": forties +"代になるあなたにとって、子供の教育費、老後への備え、親の介護などにもお金が必要になる時期です。",
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
        }
    }

    Consultation() {
        return {
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
                                "uri": htmlUrl
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
        }
    }
}

module.exports = WednesdayTalkEntity;