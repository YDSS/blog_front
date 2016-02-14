/**
 * @file 工具类，通用
 * @author ydss
 */
class Util {

    /**
     * 月、日不足两位补0
     *
     * @param {string|number} date 月或日
     * @return {string}
     *
     * @exports
     */
    static fillZero(date) {
        date = '' + date;
        if (date && date.length < 2) {
            return '0' + date; 
        }
        else {
            return date;
        }
    }

     /**
     * 请求失败时通用的meta信息
     * 
     * @param {Object} res fetch api返回的response对象
     * @return {Object} meta信息
     */
    static metaForFetchFail(res) {
        if (res) {
            notie.alert(1, res.statusText, 1);
            return {
                status: res.status,
                statusText: res.statusText
            };
        } else {
            return {
                status: 'Network request failed'
            };
        }
    }
}

export default Util;
