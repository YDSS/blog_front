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

    /**
     * 解析日记的文件名，获取year, month, day信息
     *  文件名格式为：2016-03-09[.md]
     *
     * @param {string} diaryName 文件名，或者是dateString
     * @return {Object|Null} year, month, day
     */
    static parseDiaryName(diaryName) {
        if (!diaryName) {
            return null;
        }

        let matches = diaryName.match(/(\d{4})-(\d{2})-(\d{2})/);

        // 年月日加上input，应该返回一个长度为4的数组
        if (!matches || matches.length !== 4) {
            throw new Error('diary name has wrong format!');
        }
        
        return {
            year: matches[1],
            month: matches[2],
            day: matches[3]
        };
    }
}

export default Util;
