const mysql = require('mysql');
const { MySqlConnectionCfg } = require('../../mysql.config');

/**
 * SQLの共通の方法
 * @author li long
 * @date 2019-2-26
 */

class MySqlHelper {

    /**
     * 構造
     */
    constructor() {
        this.connection = mysql.createConnection(MySqlConnectionCfg);
        // this.connection.connect();
    }

    /**
     * SQLの検索
     * @author li long
     * @date 2019-2-26
     * @param sqlstring SQLの語句
     * @constructor
     */
    GetTable(sqlstring) {
        return new Promise((resolve, reject) => {
            // this.connection.connect();
            this.connection.query(sqlstring, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    let _result = [];
                    result.forEach(item => {
                        let obj = {};
                        for (let name in item) {
                            obj[name] = item[name];
                        }
                        _result.push(obj);
                    });
                    resolve(_result);
                }
            });
            // this.connection.end();
        });
    }

    /**
     * SQLの増加、削除と変更
     * @author li long
     * @date 2019-2-26
     * @param sqlstring SQLの語句
     * @constructor
     */
    ExecuteNonQuery(sqlstring) {
        return new Promise((resolve, reject) => {
            this.connection.query(sqlstring, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

function handleDisconnect(connection) {
    connection.on('error', function(err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        console.log('Re-connecting lost connection: ' + err.stack);

        connection = mysql.createConnection(connection.config);
        handleDisconnect(connection);
        connection.connect();
    });
}

module.exports = MySqlHelper;