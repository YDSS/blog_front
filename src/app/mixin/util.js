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
}

export default Util;
