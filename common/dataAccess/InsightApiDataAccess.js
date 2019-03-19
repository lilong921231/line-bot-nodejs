const http = require("http");

const commonEntity = require('../entity/CommonEntity');
const reqDataApi = require('../entity/InsightRequestEntity');
const mysql = require('../../model/database/MySqlHelper');
const dataAccess = new mysql();

const insightApiDataAccess = {
    GetInsights: function (userId, byId) {
        return new Promise((resolve, reject)=>{
            if (byId) {
                getInsights(userId, resolve, reject);
                return;
            }
            getUserPId(userId).then(data => {
                if (!data || data.length === 0) {
                    resolve("MsgId");
                    return;
                }
                const pId = data[0].PersoneticsId;
                console.log(pId);
                getInsights(pId, resolve, reject);
            }).catch(err => {
                reject(err);
            });
        });
    }
};

function getInsights(pId, resolve, reject) {
    const date = commonEntity.dateTime("MM/DD/YYYY 00:00");
    const langId = commonEntity.getInsightLangId();

    const options = reqDataApi.getOptions(pId, date);
    const postData = reqDataApi.getInsights(langId);

    const req = http.request(options,res => {
        let data = "";
        console.log('STATUS: ' + res.statusCode);
        res.setEncoding('UTF-8');
        res.on('data',chunk => {
            data += chunk;
        });
        res.on('end',() => {
            console.log("============response================");
            console.log(data.length);
            resolve(JSON.parse(data));
        });
    }).on('error',function(e){
        console.log('problem with request: ' + e.message);
        reject(e);
    });

    req.write(JSON.stringify(postData));

    req.end();
}

/**
 * 検索のSQL語句
 * @param userId ユーザーのId
 */
function getUserPId(userId) {
    let strSql = "SELECT PersoneticsId ";
    strSql = strSql + "FROM ";
    strSql = strSql + "TM_Customer ";
    strSql = strSql + "WHERE ";
    strSql = strSql + "UserId = " + userId;
    return dataAccess.GetTable(strSql);
}

module.exports = insightApiDataAccess;