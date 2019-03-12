let UserInfoDataAccess = require('../dataAccess/UserDataAccess');

let dataAccess = new UserInfoDataAccess();

function UserRouter(req, res) {
    console.log(req);
    const MailAddress = req.body.MailAddress || '';
    dataAccess.userInfo(MailAddress).then(data => {
        let dataJson;
        if(data.length !== 1) {
            dataJson = {start: '4', data: data, message: 'ユーザーの情報がありません。'};
        } else {
            dataJson = {start: '0', data: data};
        }
        res.json(dataJson);
    }).catch(err => {
        res.json({start: '9', message: err})
    });
}

module.exports = UserRouter;