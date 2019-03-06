let mysql = require('../../model/database/MySqlHelper');
let dataAccess = new mysql();

class MondayDataAccess {
    Monday(userMail) {
        let strSql = "SELECT ";
            strSql = strSql + "tb.Balance, ";
            strSql = strSql + "tb.Salary, ";
            strSql = strSql + "tb.Rent, ";
            strSql = strSql +  "tb.Deduction, ";
            strSql = strSql + "tb.Income ";
            strSql = strSql + "FROM ";
            strSql = strSql +  "TM_Customer AS tm ";
            strSql = strSql +  "LEFT JOIN ";
            strSql = strSql +  "TB_CustomerAccount AS tb ";
            strSql = strSql +  "ON ";
            strSql = strSql +  "tm.UserId ";
            strSql = strSql +  "= ";
            strSql = strSql +  "tb.UserId ";
            strSql = strSql +  "WHERE tm.MailAddress = '" + userMail + "'";
        return dataAccess.GetTable(strSql);
    }
}

module.exports = MondayDataAccess;