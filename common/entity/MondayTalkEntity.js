// const imgUrl = "https://lilongceshi.herokuapp.com/images/";
const commonEntity = require('./CommonEntity');

const imgUrl = commonEntity.staticPath + "images/";

/**
 * 月曜日に表示する情報クラス
 * @author li long
 * @date 2019-3-4
 */


const mondayTalkEntity = {

    // /**
    //  *
    //  * @param date
    //  * @param addDays
    //  * @returns {string}
    //  * @constructor
    //  */
    // AddDate(date, addDays){
    //     var Dates = new Date(date);
    //     Dates.setDate(Dates.getDate() + addDays);
    //     var mon = Dates.getMonth() + 1,
    //         day = Dates.getDate();
    //     if(mon < 10){
    //         mon = "0" + mon;
    //     }
    //     if(day < 10){
    //         day = "0" + day;
    //     }
    //     return Dates.getFullYear() + "年 " + mon + "月" + day + "日";
    // },

    /**
     * firstTime EntityClass No.1
     * @param balance
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, header: {type: string, layout: string, contents: *[]}}}}
     */
    firstTimeEntity(balance) {
        const entity = {
            type: "flex",
            altText: "Flex Message",
            contents: {
                type: "bubble",
                direction: "ltr",
                header: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "おはようございます。 ",
                            align: "start",
                            gravity: "center"
                        },
                        {
                            type: "text",
                            text: "今日は月曜日ですね。"
                        },
                        {
                            type: "text",
                            text: " 今日からまた新しい "
                        },
                        {
                            type: "text",
                            text: "一週間の始まりです。 "
                        },
                        {
                            type: "text",
                            text: "現在の口座残高 "
                        },
                        {
                            type: "text",
                            text: "は" + commonEntity.formatCurrencyT(balance) + "円です。"
                        }
                    ],
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.header.contents);
        return entity;
    },

    /**
     * receiptsOfWeek
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, header: {type: string, layout: string, contents: *[]}}}}
     * @constructor
     */
    receiptsOfWeek() {
        const entity =  {
            type: "flex",
            altText: "Flex Message",
            contents: {
                type: "bubble",
                direction: "ltr",
                header: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "今週の口座入出金予定",
                            align: "start"
                        },
                        {
                            type: "text",
                            text: "をご案内します。"
                        },
                        {
                            type: "button",
                            action: {
                                type: "postback",
                                label: "OK",
                                data: "deposit and withdrawal"
                            }
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.header.contents);
        return entity;
    },

    /**
     *
     * @param date date
     * @param format format
     * @param receipts receipts
     * @param rent rent
     * @param ABCCode ABCCode
     * @returns {{type: string, altText: string, contents: {type: string, body: {type: string, layout: string, spacing: string, contents: {type: string, layout: string, contents: *[]}[]}}}}
     */
    detailedOfWeek(date, format, receipts, rent, ABCCode) {

        const truncs = [
            {type: "salary", date: commonEntity.dateTime(format, {time: date}), amount: receipts},
            {type: "transfer", date: commonEntity.dateTime(format, {amount: 2, dateCode: "D", time: date}), amount: rent},
            {type: "withdrawal", date: commonEntity.dateTime(format, {amount: 4, dateCode: "D", time: date}), amount: ABCCode},
        ];

        const entity = {
            type: "flex",
            altText: "Flex Message",
            contents: {
                type: "bubble",
                body: {
                    type: "box",
                    layout: "horizontal",
                    spacing: "md",
                    contents: []
                }
            }
        };

        if (truncs.length === 0) {
            entity.contents.body.contents.push({
                type: "text",
                text: "今週の口座入出金予定がありません。"
            });
            entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
            return entity;
        }

        entity.contents.body.contents.push({
            type: "box",
            layout: "vertical",
            contents: []
        });

        truncs.forEach(function (dayTrunc, index) {
            if (index !== 0)
                entity.contents.body.contents[0].contents.push({
                    type: "separator",
                    margin: "xl",
                    color: "#C5C5C5"
                });
            getTempContent(dayTrunc, entity.contents.body.contents[0].contents);
        });
        entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents[0].contents);
        return entity;
    },

    /**
     * Recommend
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     * @constructor
     */
    Recommend(recommendMoney) {
        const entity = {
            type: "flex",
            altText: "Flex Message",
            contents: {
                type: "bubble",
                direction: "ltr",
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "推奨する今週の可処分",
                            size: "lg",
                            align: "start",
                            color: "#323232"
                        },
                        {
                            type: "text",
                            text: "所得：",
                            size: "lg",
                            color: "#323232"
                        },
                        {
                            type: "text",
                            text: commonEntity.formatCurrencyT(recommendMoney) + "円",
                            size: "xl",
                            align: "center",
                            weight: "regular",
                            color: "#323232"
                        },
                        {
                            type: "button",
                            action: {
                                type: "postback",
                                label: "OK",
                                data: "information of events"
                            },
                            margin: "xs"
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents);
        return entity;
    },

    /**
     * thisWeekEvent
     * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
     */
    thisWeekEvent(date, format, money) {
        const entity = {
            type: "flex",
            altText: "Flex Message",
            contents: {
                type: "bubble",
                direction: "ltr",
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "今週のイベントもご案内いたし",
                            color: "#323232"
                        },
                        {
                            type: "text",
                            text: "ます。",
                            color: "#323232"
                        },
                        {
                            type: "separator",
                            margin: "lg",
                            color: "#2A2A2A"
                        },
                        {
                            type: "text",
                            text: commonEntity.dateTime(format, {time: date}),
                            margin: "md"
                        },
                        {
                            type: "image",
                            url: imgUrl + "cake.jpg",
                            margin: "md",
                            size: "full",
                            aspectRatio: "20:13"
                        },
                        {
                            type: "text",
                            text: "奥様・SHIHO様",
                            margin: "md",
                            size: "xs",
                            align: "center",
                            color: "#323232"
                        },
                        {
                            type: "text",
                            text: "ご誕生日です！",
                            margin: "sm",
                            align: "center",
                            weight: "bold",
                            color: "#323232"
                        },
                        {
                            type: "separator",
                            margin: "lg",
                            color: "#2A2A2A"
                        },
                        {
                            type: "image",
                            url: imgUrl + "Rose.jpg",
                            size: "full",
                            aspectRatio: "20:13"
                        },
                        {
                            type: "text",
                            text: "赤いバラ20本",
                            margin: "md"
                        },
                        {
                            type: "text",
                            text: "当日ご自宅へお届け",
                            margin: "xs"
                        },
                        {
                            type: "box",
                            layout: "horizontal",
                            margin: "xs",
                            contents: [
                                {
                                    type: "text",
                                    text: "特別価格"
                                },
                                {
                                    type: "text",
                                    text: commonEntity.formatCurrencyT(money) + "円",
                                    align: "end"
                                }
                            ]
                        },
                        {
                            type: "button",
                            action: {
                                type: "uri",
                                label: "注文",
                                uri: "https://www.i879.com/products/catalog-detail/categoryId/ya0b/productCd/116003?grid=reco_ranking_product"
                            },
                            margin: "sm",
                            height: "sm"
                        },
                        {
                            type: "separator",
                            margin: "md",
                            color: "#2A2A2A"
                        },
                        {
                            type: "text",
                            text: "バースデーディナーのご予約は？",
                            margin: "lg"
                        },
                        {
                            type: "image",
                            url: imgUrl + "dinner.jpg",
                            margin: "md",
                            size: "full",
                            aspectRatio: "20:13"
                        },
                        {
                            type: "button",
                            action: {
                                type: "uri",
                                label: "予約",
                                uri: "https://restaurant.ikyu.com/area/tokyo/10001/05/t-scene2859/"
                            }
                        }
                    ]
                }
            }
        };
        entity.altText = commonEntity.getTemplateAltText([entity.contents.body.contents[0],entity.contents.body.contents[1]]);
        return entity;
    },
};

function getTempContent(trunc, contents){
    let temps;
    switch (trunc.type) {
        case "salary":
            temps = getTempSalary(trunc);
            break;
        case "transfer":
            temps = getTempTransfer(trunc);
            break;
        case "withdrawal":
            temps = getTempWithdrawal(trunc);
            break;
    }
    temps.forEach(function (temp) {
        contents.push(temp);
    });
}

function getTempSalary(trunc) {
    return [
        {
            type: "text",
            text: trunc.date
        },
        {
            type: "image",
            url: imgUrl + "salary_jpg.jpg",
            margin: "md",
            size: "full",
            aspectRatio: "20:13"
        },
        {
            type: "text",
            text: "給与",
            margin: "lg",
            size: "xs",
            align: "center",
            gravity: "bottom",
            weight: "regular",
            color: "#323232"
        },
        {
            type: "text",
            text: commonEntity.formatCurrencyT(trunc.amount) + "円",
            size: "sm",
            align: "center",
            gravity: "center",
            weight: "regular",
            color: "#323232"
        }
    ];
}

function getTempTransfer(trunc) {
    return [
        {
            type: "text",
            text: trunc.date,
            margin: "md"
        },
        {
            type: "image",
            url: imgUrl + "salary_jpg.jpg",
            margin: "md",
            size: "full",
            aspectRatio: "20:13"
        },
        {
            type: "text",
            text: "口座振込（家賃）",
            margin: "md",
            align: "center",
            color: "#323232"
        },
        {
            type: "text",
            text: "-" + commonEntity.formatCurrencyT(trunc.amount) + "円",
            margin: "sm",
            align: "center",
            color: "#323232"
        }
    ];
}

function getTempWithdrawal(trunc) {
    return [
        {
            type: "text",
            text: trunc.date,
            margin: "md"
        },
        {
            type: "image",
            url: imgUrl + "creditCard_jpg.jpg",
            margin: "md",
            size: "full",
            aspectRatio: "20:13"
        },
        {
            type: "text",
            text: "ABCカード引落し",
            align: "center",
            color: "#323232"
        },
        {
            type: "text",
            text: "-" + commonEntity.formatCurrencyT(trunc.amount) + "円",
            align: "center",
            color: "#323232"
        }
    ];
}

// class mondayTalkEntity {
//
//     AddDate(date, addDays){
//         var Dates = new Date(date);
//         Dates.setDate(Dates.getDate() + addDays);
//         var mon = Dates.getMonth() + 1,
//             day = Dates.getDate();
//         if(mon < 10){
//             mon = "0" + mon;
//         }
//         if(day < 10){
//             day = "0" + day;
//         }
//         return Dates.getFullYear() + "年 " + mon + "月" + day + "日";
//     }
//
//     /**
//      * firstTime EntityClass No.1
//      * @param balance
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, header: {type: string, layout: string, contents: *[]}}}}
//      */
//     firstTimeEntity(balance) {
//         const entity = {
//             type: "flex",
//             altText: "Flex Message",
//             contents: {
//                 type: "bubble",
//                 direction: "ltr",
//                 header: {
//                     type: "box",
//                     layout: "vertical",
//                     contents: [
//                         {
//                             type: "text",
//                             text: "おはようございます。 ",
//                             align: "start",
//                             gravity: "center"
//                         },
//                         {
//                             type: "text",
//                             text: "今日は月曜日ですね。"
//                         },
//                         {
//                             type: "text",
//                             text: " 今日からまた新しい "
//                         },
//                         {
//                             type: "text",
//                             text: "一週間の始まりです。 "
//                         },
//                         {
//                             type: "text",
//                             text: "現在の口座残高 "
//                         },
//                         {
//                             type: "text",
//                             text: "は" + balance + "円です。"
//                         }
//                     ],
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.header.contents);
//         return entity;
//     }
//
//     /**
//      * receiptsOfWeek
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, header: {type: string, layout: string, contents: *[]}}}}
//      * @constructor
//      */
//     receiptsOfWeek() {
//         const entity =  {
//             type: "flex",
//             altText: "Flex Message",
//             contents: {
//                 type: "bubble",
//                 direction: "ltr",
//                 header: {
//                     type: "box",
//                     layout: "vertical",
//                     contents: [
//                         {
//                             type: "text",
//                             text: "今週の口座入出金予定",
//                             align: "start"
//                         },
//                         {
//                             type: "text",
//                             text: "をご案内します。"
//                         },
//                         {
//                             type: "button",
//                             action: {
//                                 type: "postback",
//                                 label: "OK",
//                                 data: "deposit and withdrawal"
//                             }
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.header.contents);
//         return entity;
//     }
//
//     /**
//      *
//      * @param date year
//      * @param day day
//      * @param receipts receipts
//      * @param rent rent
//      * @param ABCCode ABCCode
//      * @returns {{type: string, altText: string, contents: {type: string, body: {type: string, layout: string, spacing: string, contents: {type: string, layout: string, contents: *[]}[]}}}}
//      */
//     detailedOfWeek(date, day, receipts, rent, ABCCode) {
//
//         const nowDate = this.AddDate(date, 0);
//         const twoDaysLater = this.AddDate(date, 2);
//         const fourDaysLater = this.AddDate(date, 4);
//         var dateJp = ['日', '月', '火', '水', '木', '金', '土'];
//         var twoDaysLaterWeek; // Two days later
//         var fourDaysLaterWeek; // four days later
//
//         /**
//          * Date calculation
//          */
//         for(var i = 0; i < dateJp.length; i++) {
//             if(day === dateJp[i]) {
//                 twoDaysLaterWeek = dateJp[(i + 2) % 7];
//                 fourDaysLaterWeek = dateJp[(i + 4) % 7];
//                 break;
//             }
//         }
//
//         const entity = {
//             type: "flex",
//             altText: "Flex Message",
//             contents: {
//                 type: "bubble",
//                 body: {
//                     type: "box",
//                     layout: "horizontal",
//                     spacing: "md",
//                     contents: [
//                         {
//                             type: "box",
//                             layout: "vertical",
//                             contents: [
//                                 {
//                                     type: "text",
//                                     text: nowDate + "(" + day + ")"
//                                 },
//                                 {
//                                     type: "image",
//                                     url: imgUrl + "salary_jpg.jpg",
//                                     margin: "md",
//                                     size: "full",
//                                     aspectRatio: "20:13"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: "給与",
//                                     margin: "lg",
//                                     size: "xs",
//                                     align: "center",
//                                     gravity: "bottom",
//                                     weight: "regular",
//                                     color: "#323232"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: receipts + "円",
//                                     size: "sm",
//                                     align: "center",
//                                     gravity: "center",
//                                     weight: "regular",
//                                     color: "#323232"
//                                 },
//                                 {
//                                     type: "separator",
//                                     margin: "xl",
//                                     color: "#C5C5C5"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: twoDaysLater + "(" + twoDaysLaterWeek + ")",
//                                     margin: "xl"
//                                 },
//                                 {
//                                     type: "image",
//                                     url: imgUrl + "accountBalance_jpg.jpg",
//                                     margin: "md",
//                                     size: "full",
//                                     aspectRatio: "20:13"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: "口座振込（家賃）",
//                                     margin: "md",
//                                     align: "center",
//                                     color: "#323232"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: "-" + rent + "円",
//                                     margin: "sm",
//                                     align: "center",
//                                     color: "#323232"
//                                 },
//                                 {
//                                     type: "separator",
//                                     margin: "xl",
//                                     color: "#C5C5C5"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: fourDaysLater + "(" + fourDaysLaterWeek + ")",
//                                     margin: "md"
//                                 },
//                                 {
//                                     type: "image",
//                                     url: imgUrl + "creditCard_jpg.jpg",
//                                     margin: "md",
//                                     size: "full",
//                                     aspectRatio: "20:13"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: "ABCカード引落し",
//                                     align: "center",
//                                     color: "#323232"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: "-" + ABCCode + "円",
//                                     align: "center",
//                                     color: "#323232"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText(entity.contents.body.contents[0].contents);
//         return entity;
//     }
//
//     /**
//      * Recommend
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
//      * @constructor
//      */
//     Recommend(recommendMoney) {
//         const entity = {
//             type: "flex",
//             altText: "Flex Message",
//             contents: {
//                 type: "bubble",
//                 direction: "ltr",
//                 body: {
//                     type: "box",
//                     layout: "vertical",
//                     contents: [
//                         {
//                             type: "text",
//                             text: "推奨する今週の可処分",
//                             size: "lg",
//                             align: "start",
//                             color: "#323232"
//                         },
//                         {
//                             type: "text",
//                             text: "所得：",
//                             size: "lg",
//                             color: "#323232"
//                         },
//                         {
//                             type: "text",
//                             text: recommendMoney + "円",
//                             size: "xl",
//                             align: "center",
//                             weight: "regular",
//                             color: "#323232"
//                         },
//                         {
//                             type: "button",
//                             action: {
//                                 type: "postback",
//                                 label: "OK",
//                                 data: "information of events"
//                             },
//                             margin: "xs"
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
//      * thisWeekEvent
//      * @returns {{type: string, altText: string, contents: {type: string, direction: string, body: {type: string, layout: string, contents: *[]}}}}
//      */
//     thisWeekEvent(date, day, money) {
//         const nowDate = this.AddDate(date, 0);
//         const entity = {
//             type: "flex",
//             altText: "Flex Message",
//             contents: {
//                 type: "bubble",
//                 direction: "ltr",
//                 body: {
//                     type: "box",
//                     layout: "vertical",
//                     contents: [
//                         {
//                             type: "text",
//                             text: "今週のイベントもご案内いたし",
//                             color: "#323232"
//                         },
//                         {
//                             type: "text",
//                             text: "ます。",
//                             color: "#323232"
//                         },
//                         {
//                             type: "separator",
//                             margin: "lg",
//                             color: "#2A2A2A"
//                         },
//                         {
//                             type: "text",
//                             text: nowDate + "(" + day + ")",
//                             margin: "md"
//                         },
//                         {
//                             type: "image",
//                             url: imgUrl + "cake.jpg",
//                             margin: "md",
//                             size: "full",
//                             aspectRatio: "20:13"
//                         },
//                         {
//                             type: "text",
//                             text: "奥様・SHIHO様",
//                             margin: "md",
//                             size: "xs",
//                             align: "center",
//                             color: "#323232"
//                         },
//                         {
//                             type: "text",
//                             text: "ご誕生日です！",
//                             margin: "sm",
//                             align: "center",
//                             weight: "bold",
//                             color: "#323232"
//                         },
//                         {
//                             type: "separator",
//                             margin: "lg",
//                             color: "#2A2A2A"
//                         },
//                         {
//                             type: "image",
//                             url: imgUrl + "Rose.jpg",
//                             size: "full",
//                             aspectRatio: "20:13"
//                         },
//                         {
//                             type: "text",
//                             text: "赤いバラ20本",
//                             margin: "md"
//                         },
//                         {
//                             type: "text",
//                             text: "当日ご自宅へお届け",
//                             margin: "xs"
//                         },
//                         {
//                             type: "box",
//                             layout: "horizontal",
//                             margin: "xs",
//                             contents: [
//                                 {
//                                     type: "text",
//                                     text: "特別価格"
//                                 },
//                                 {
//                                     type: "text",
//                                     text: money + "円",
//                                     align: "end"
//                                 }
//                             ]
//                         },
//                         {
//                             type: "button",
//                             action: {
//                                 type: "uri",
//                                 label: "注文",
//                                 uri: "https://www.i879.com/products/catalog-detail/categoryId/ya0b/productCd/116003?grid=reco_ranking_product"
//                             },
//                             margin: "sm",
//                             height: "sm"
//                         },
//                         {
//                             type: "separator",
//                             margin: "md",
//                             color: "#2A2A2A"
//                         },
//                         {
//                             type: "text",
//                             text: "バースデーディナーのご予約は？",
//                             margin: "lg"
//                         },
//                         {
//                             type: "image",
//                             url: imgUrl + "dinner.jpg",
//                             margin: "md",
//                             size: "full",
//                             aspectRatio: "20:13"
//                         },
//                         {
//                             type: "button",
//                             action: {
//                                 type: "uri",
//                                 label: "予約",
//                                 uri: "https://restaurant.ikyu.com/area/tokyo/10001/05/t-scene2859/"
//                             }
//                         }
//                     ]
//                 }
//             }
//         };
//         entity.altText = commonEntity.getTemplateAltText([entity.contents.body.contents[0],entity.contents.body.contents[1]]);
//         return entity;
//     }
// }

module.exports = mondayTalkEntity;