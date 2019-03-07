var linebot = require('linebot');

/**
 * lineのコンフィグ
 * @author li long
 * @date 2019-2-26
 */

/**
 * コンフィグのインターフェース
 * @type {LineBot}
 */
module.exports = linebot({
    channelId: "1646638453", // lineアカウントのID
    channelSecret: "c20aee7e28b0b762cbf5adb9e8a1fa96", // lineのChannel_Secret
    channelAccessToken: "noRmAnxXUXdfOEmrasRRY0IF/YPJd+6WF5XXtQ0Nzhl438A+cvFalWwMAOSY1V2hwY3e6xQERfmGBhv2CxuCiJDF80xy4Ryo9N/" +
        "mMTsd+6z5AZNXJI6fXtL2eCr/gUSIovXzKIDaGBlEDFSaF7BW4gdB04t89/1O/w1cDnyilFU=" // lineのChannel_Access_Token
    }
);