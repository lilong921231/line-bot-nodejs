/**
 * ユーザー利用明細の実態クラス
 * @author li long
 * @date 2019-3-7
 * @type {{UserId: string, PersoneticsId: string, Name: string, NameKana: string, MailAddress: string, BirthDate: string, PhoneNumber: string, Sex: string}}
 */
module.exports = {

    /**
     * ユーザーのID
     */
    UserId: '',

    /**
     * 誕生日
     */
    BirthDate: '',

    /**
     * 口座残高
     */
    Balance: '',

    /**
     * 給料
     */
    Salary: '',

    /**
     * 家賃
     */
    Rent: '',

    /**
     * ABCカード引落し
     */
    Deduction: '',

    /**
     * 推奨のお金
     */
    Income: '',

    /**
     * 借入金額
     */
    BorrowedAmount: ''

};