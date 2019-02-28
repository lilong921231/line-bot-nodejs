var talkEntity = require('./entity/TalkEntity');
// var ceshi = require('../public/images/wages.png');
var talk = new talkEntity();


function talkServer(eventSelect) {
    switch (eventSelect) {
        case '1':
            console.log("=========test1===========");
            return talk.firstTimeEntity('5000000');
        case '2':
            console.log("=========image===========");
            var day = "日月火水木金土".charAt(new Date().getDay());
            return talk.detailedOfWeek('2018-11-09', day, '500000', '-2000000', '20000000');
        case '3':
            console.log("=========test2===========");

            var day = "日月火水木金土".charAt(new Date().getDay());
            // return talk.receiptsOfWeek();
            return {
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
                                    label: "Button",
                                    text: {
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
                                                        text: "は6000000円です。"
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    data: "1",
                                }
                            }
                        ]
                    }
                }
            };
    }

}

module.exports = {
    talkServer
};
