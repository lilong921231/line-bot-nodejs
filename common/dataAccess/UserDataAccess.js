let mysql = require('../../model/database/MySqlHelper');
let dataAccess = new mysql();

/**
 * ユーザーの情報を検索
 * @author li long
 * @date 2019-3-6
 */

class UserInfoDataAccess {
    /**
     * 検索のSQL語句
     * @param userMail ユーザーのE-Mail
     */
    userInfo(userMail) {
        const strSql = "SELECT * FROM TM_Customer WHERE MailAddress = '" + userMail + "'";
        return dataAccess.GetTable(strSql);
    }

    userUpdate(data) {
        let strSql = "UPDATE TM_Customer ";
            strSql = strSql + "SET ";
            strSql = strSql + "`Name` = '" + data.Name + "', ";
            strSql = strSql + "NameKana = '" + data.NameKana + "', ";
            strSql = strSql + "MailAddress = '" + data.MailAddress + "', ";
            strSql = strSql + "BirthDate = '" + data.BirthDate + "', ";
            strSql = strSql + "PhoneNumber = '" + data.PhoneNumber + "', ";
            strSql = strSql + "Sex = '" + data.Sex + "' ";
            strSql = strSql + "WHERE UserId = " + data.UserId + "";
        return dataAccess.ExecuteNonQuery(strSql);

    }
}

/**
 * ユーザーの情報を検索するインターフェース
 * @type {UserInfoDataAccess}
 */
module.exports = UserInfoDataAccess;