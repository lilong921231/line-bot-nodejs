const commonEntity = require('./CommonEntity');

const imgUrl = commonEntity.staticPath + "images/teaser_images/";

const moment = require('moment');

function parseEntity(data) {
    const resultEntity = [];
    console.log(data.status + ", " + data.statusMessage);
    console.log(data.requestType + " ok=" + data.ok + ", " + data.unreadMessages);
    if (data.status === "200" && data.insights.length !== 0) {
        let info, teaser;
        data.insights.forEach(function (insight) {
            if (resultEntity.length === 5) {
                return resultEntity;
            }
            // console.log(insight);
            info = {};
            teaser = insight.teaserBlocks;
            info.date = moment(teaser[1].date).format("M月 DD日");
            info.title = teaser[2].text;
            info.text = teaser[3].text;
            if (insight.teaserTemplate === "image") {
                info.url = imgUrl + teaser[4].url + ".png";
                if (teaser[4].url.split(" ").length > 1) {
                    info.url = imgUrl + "CG100.png";
                } else {
                    info.url = imgUrl + teaser[4].url + ".png";
                }
                // fs.exists(info.url, function () {
                //     info.url = imgUrl + "CG100.png";
                // });
            } else if (insight.teaserTemplate === "doubleBox") {
                info.box = [[teaser[5].text, teaser[4].text], [teaser[7].text, teaser[6].text]];
            }
            resultEntity.push(insightCardImage(info));
        });
        return resultEntity;
    } else {
        resultEntity.push("No newest information of insight!");
        return resultEntity;
    }
}

function insightCardImage(insight) {
    const flex = {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
            "type": "bubble",
            "direction": "ltr",
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "text",
                        "text": insight.date,
                        "size": "sm",
                        "color": "#5A5A5A"
                    },
                    {
                        "type": "text",
                        "text": insight.title,
                        "size": "lg"
                    },
                    {
                        "type": "text",
                        "text": insight.text,
                        "wrap": true
                    }
                ]
            }
        }
    };
    if (insight.url) {
        flex.contents.body.contents.push({
            "type": "image",
            "url": insight.url,
            "size": "full",
            "aspectRatio": "3:1"
        });
    } else if (insight.box) {
        flex.contents.footer = {
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": insight.box[0][0],
                                    "align": "center",
                                    "color": "#88AEF6"
                                },
                                {
                                    "type": "text",
                                    "text": insight.box[0][1],
                                    "align": "center"
                                }
                            ]
                        },
                        {
                            "type": "separator",
                            "margin": "none",
                            "color": "#E2E2E2"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": insight.box[1][0],
                                    "align": "center",
                                    "color": "#88AEF6"
                                },
                                {
                                    "type": "text",
                                    "text": insight.box[1][1],
                                    "align": "center"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "spacer"
                }
            ]
        };
    }
    flex.altText = commonEntity.getTemplateAltText(flex.contents.body.contents);
    return flex;
}
module.exports = {
    parseEntity
};