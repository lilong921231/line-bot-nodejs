const http = require("http");

const reqDataApi = require('../entity/InsightRequestEntity');

const insightApiDataAccess = {
    GetInsights: function (userId, date, langId) {
        return new Promise((resolve, reject)=>{
            const options = reqDataApi.getOptions(userId, date);

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
        });
    }
};

module.exports = insightApiDataAccess;