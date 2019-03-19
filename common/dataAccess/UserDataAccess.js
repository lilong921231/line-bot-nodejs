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
     * @param userId ユーザーのId
     */
    userInfo(userId) {
        let strSql = "SELECT tm.`Name`, ";
        strSql = strSql + "tm.NameKana, ";
        strSql = strSql + "tm.PhoneNumber, ";
        strSql = strSql + "tm.Sex, ";
        strSql = strSql + "tm.MailAddress, ";
        strSql = strSql + "tm.BirthDate, ";
        strSql = strSql + "tb.Rent, ";
        strSql = strSql + "tb.BorrowedAmount ";
        strSql = strSql + "FROM ";
        strSql = strSql + "TM_Customer AS tm ";
        strSql = strSql + "INNER JOIN ";
        strSql = strSql + "TB_CustomerAccount AS tb ";
        strSql = strSql + "WHERE ";
        strSql = strSql + "tm.UserId = " + userId;
        strSql = strSql + " AND ";
        strSql = strSql + "tb.UserId = " + userId;
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