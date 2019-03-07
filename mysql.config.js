/**
 * MySQLのコンフィグ
 * @author li long
 * @date 2019-2-26
 */

/**
 * コンフィグのインターフェース
 * @type {{MySqlConnectionCfg: {host: string, user: string, password: string, port: string, database: string, multipleStatements: boolean}}}
 */
module.exports = {
    MySqlConnectionCfg: {
        host: 'localhost', // ホスト
        user: 'root', // MySQLのユーザー
        password: '123456',// MySQLのパスワード
        port: '3306', // ポート
        database: 'lineDemo', // MySQLのDB名
        multipleStatements: true, // クエリの中で複数のクエリ語句を伝えることができるかどうかです。  true：できる　　false：できない
    }
};