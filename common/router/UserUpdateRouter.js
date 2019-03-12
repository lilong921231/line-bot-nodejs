let UserDataAccess = require('../dataAccess/UserDataAccess');

let dataAccess = new UserDataAccess();

function UserRouter(req, res) {
    const MailAddress = req.body.MailAddress || '';
    const UserId = req.body.UserId || '';
    const NameKana = req.body.NameKana || '';
    const Name = req.body.Name || '';
    const BirthDate = req.body.BirthDate || '';
    const PhoneNumber = req.body.PhoneNumber || '';
    const Sex = req.body.Sex || '';

    let data = {
        "MailAddress": MailAddress,
        "UserId" : UserId,
        "NameKana": NameKana,
        "Name": Name,
        "BirthDate": BirthDate,
        "PhoneNumber": PhoneNumber,
        "Sex": Sex
    };
    dataAccess.userUpdate(data).then(data => {
        let dataJson = {start: '0', message: '修正成功'};
        res.json(dataJson);
    }).catch(err => {
        res.json({start: '9', message: err})
    });
}

module.exports = UserRouter;