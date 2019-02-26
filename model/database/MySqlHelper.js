const mysql = require('mysql');
const { MySqlConnectionCfg } = require('../../mysql.config');

class MySqlHelper {

    /**
     * structure
     */
    constructor() {
        this.connection = mysql.createConnection(MySqlConnectionCfg);
    }

    /**
     * Execution query
     * @param sqlstring sql Sentence
     * @constructor
     */
    GetTable(sqlstring) {
        return new Promise((resolve, reject) => {
            this.connection.connect();
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
            this.connection.end();
        });
    }

    /**
     * Execution of additions, deletions and modifications
     * @param sqlstring sql Sentence
     * @constructor
     */
    ExecuteNonQuery(sqlstring) {
        return new Promise((resolve, reject) => {
            this.connection.connect();
            this.connection.query(sqlstring, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
            this.connection.end();
        });
    }
}

module.exports = MySqlHelper;