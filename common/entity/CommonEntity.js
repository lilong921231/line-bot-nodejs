const moment = require('moment');
moment.locale("ja");

const staticPath = 'https://36eab602.ngrok.io/';
const postback = {
    MonReceipts: "deposit and withdrawal",
    MonEvents: "information of events"
};
const msgId = {
    PersonecticsId: "NoPersonecticsUserId",
    NoMessageId: "NoMessage"
};
let userAccount = "aiko";
let insightLangId = "jp";

const commonEntity = {

    /**
     * 分位符を添加するの方法
     * @author li long
     * @date 2019-3-11
     * @param num 数
     * @returns {string}
     */
    formatCurrencyT(num) {
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
    },

    /**
     * 10年後の年齢
     * @author li long
     * @date 2019-3-11
     * @param age 年齢
     * @param num X年後
     * @returns {*}
     */
    getOldAge(age, num) {
        return age + num;
    },

    /**
     * 年齢の計算
     * @author li long
     * @date 2019-3-11
     * @param birthDate 誕生日
     * @returns {number}
     */
    getUserAge(birthDate) {
        let date = moment(birthDate, "YYYY").fromNow();
        date = date.substr(0, date.length - 2);
        return parseInt(date);
    },

    amountConversion(number, notRoundFlag) {
        if (notRoundFlag) {
            number = parseInt(number / 10000);
        } else {
            number = Math.round(number / 10000);
        }
        return number > 0 ? number : -number;
    },

    amountValue(number) {
        return number > 0 ? number : -number;
    },

    getTemplateAltText(contents) {
        let altText = "";
        contents.forEach(function (content) {
            if (content.type === "text") {
                altText += content.text;
            }
        });
        return altText;
    },

    setUserAccount (user) {
        userAccount = user;
    },

    getUserAccount() {
        return userAccount;
    },

    getUserId(user) {
        let userId;
        switch (user) {
            case "aiko":
                userId = 1;
                break;
            case 'kennji':
                userId = 2;
                break;
            case 'hiroshi':
                userId = 3;
                break;
            case 'kaori':
                userId = 4;
                break;
        }
        if (userId) {
            this.setUserAccount(user);
        }
        return userId;
    },

    setInsightLangId (langId) {
        insightLangId = langId;
    },

    getInsightLangId() {
        return insightLangId;
    },

    getMonReceipts() {
        return postback.MonReceipts;
    },

    getMonEvents() {
        return postback.MonEvents;
    },

    dateTime(format, others) {
        // let date;
        // if (others.time) {
        //     date = moment(others.time);
        // } else {}
        const date = others && others.time ? moment(others.time): moment();
        if (!others || !others.dateCode) {
            return date.format(format);
        }
        if (others.sub) {
            switch (others.dateCode) {
                case "Y":
                    date.subtract(others.amount, 'years');
                    break;
                case "M":
                    date.subtract(others.amount, 'months');
                    break;
                case "D":
                    date.subtract(others.amount, 'days');
                    break;
            }
        } else {
            switch (others.dateCode) {
                case "Y":
                    date.add(others.amount, 'years');
                    break;
                case "M":
                    date.add(others.amount, 'months');
                    break;
                case "D":
                    date.add(others.amount, 'days');
                    break;
            }
        }
        return date.format(format);
    },

    getNoPId() {
        return msgId.PersonecticsId;
    },

    getNoMsgId() {
        return msgId.NoMessageId;
    },

    getMessageInfo (msgId) {
        switch (msgId) {
            case this.getNoPId():
                return "Personeticsのアカウントが登録させていません。";
            case this.getNoMsgId():
                return "メッセージ入力ありがとうございます。ごめんなさい、入力された内容が判別できませんでした。";
            default:
                console.log("No the msgId.");
        }
    }

};

module.exports = commonEntity;
module.exports.staticPath = staticPath;