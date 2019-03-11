let mysql = require('../../model/database/MySqlHelper');
let dataAccess = new mysql();

/**
 * ユーザーの口座残高や、家賃や、給料などSQLごくの検索
 * @author li long
 * @date 2019-3-6
 */
class MondayDataAccess {
    /**
     * 検索のSQL語句
     * @author li long
     * @date 2019-3-6
     * @param userMail ユーザのE-Mail
     * @constructor　検索の結果
     */
    Monday(userMail) {

        let strSql = "SELECT ";
            strSql = strSql + "tb.Balance, ";
            strSql = strSql + "tb.UserId, ";
            strSql = strSql + "tb.Salary, ";
            strSql = strSql + "tm.BirthDate";
            strSql = strSql + "tb.Rent, ";
            strSql = strSql + "tb.Deduction, ";
            strSql = strSql + "tb.Income ";
            strSql = strSql + "FROM ";
            strSql = strSql + "TM_Customer AS tm ";
            strSql = strSql + "LEFT JOIN ";
            strSql = strSql + "TB_CustomerAccount AS tb ";
            strSql = strSql + "ON ";
            strSql = strSql + "tm.UserId ";
            strSql = strSql + "= ";
            strSql = strSql + "tb.UserId ";
            strSql = strSql + "WHERE tm.MailAddress = '" + userMail + "'";

            return dataAccess.GetTable(strSql)/*.then(data => {
                     return data;
                }).catch(err => {
                    return err;
                });*/
    }
}

/**
 * 月曜日に表示する情報のインターフェース
 * @author li long
 * @date 2019-3-6
 * @type {MondayDataAccess}
 */
module.exports = MondayDataAccess;