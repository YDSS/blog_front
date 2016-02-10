import {CALL_API} from 'redux-api-middleware';
import notie from 'notie';

const fileApi = '/api/file';

export const UPLOAD_DIARY_REQUEST = 'UPLOAD_DIARY_REQUEST';
export const UPLOAD_DIARY_SUCCESS = 'UPLOAD_DIARY_SUCCESS';
export const UPLOAD_DIARY_FAIL = 'UPLOAD_DIARY_FAIL';

/**
 * 上传日记
 *
 * @param {FormData} file 包含上传文件的表单数据
 */
export function upload(file) {
    return (dispatch, getState) => {
        return dispatch(saveUpload(file));
    }
}

function saveUpload(file) {
    return {
        [CALL_API]: {
            types: [
                UPLOAD_DIARY_REQUEST,
                {
                    type: UPLOAD_DIARY_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json()
                            .then(json => {
                                if (json.errno !== 0) {
                                    notie.alert(3, 'upload failed...', 1);
                                    return null;
                                }
                                
                                notie.alert(1, 'upload success!', 1);
                                return json.data;
                            })
                            .catch(err => {
                                console.log(err.message);   
                            });
                    }
                },
                {
                    type: UPLOAD_DIARY_FAIL,
                    meta: (action, state, res) => {
                        notie.alert(3, 'request failed...', 1);
                        return metaForFetchFail(res);
                    }
                }
            ],
            endpoint: `${fileApi}/upload`,
            method: 'POST',
            body: file
        }
    };
}

export const GET_DIARY_REQUEST = 'GET_DIARY_REQUEST';
export const GET_DIARY_SUCCESS = 'GET_DIARY_SUCCESS';
export const GET_DIARY_FAIL = 'GET_DIARY_FAIL';

/**
 * 通过日记的日期取日记信息
 *
 * @param {string} dateString 包含年月日的字符串，
 *  需要能用Date.parse的格式，比如2015/11/22
 */
export function loadDiary(dateString) {
    return (dispatch, getState) => {
        // 遍历缓存中是否已有该日记，
        // 有则返回，没有则继续请求
        const list = getState().diary.list;
        let cache = list.find(item => item.dateString === dateString);
        // getDiariesByMonth会取到当月的所有日记的dateString，
        // 所以加上content来判断是否有缓存
        if (cache && cache.content) {
            return Promise.resolve(cache);
        }
        else {
            return dispatch(fetchDiary(dateString));
        }
    }
}

/**
 * 请求指定日期的日记
 *
 * @param {string} dateString 日记日期
 * @return {Object} FSA(flux standard action)对象
 */
function fetchDiary(dateString) {
    return {
        [CALL_API]: {
            endpoint: `${fileApi}/find?dateString=${dateString}`,
            method: 'GET',
            types: [
                GET_DIARY_REQUEST,
                {
                    type: GET_DIARY_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json()
                            .then(json => {
                                if (json.errno === 0 && json.data) {
                                    return json.data;
                                }       
                                else {
                                    notie.alert(3, 'fetch diary failed...', 1);
                                    return null;
                                }
                            })
                            .catch(err => {
                                console.log(err.message);   
                            });
                    }
                },
                {
                    type: GET_DIARY_FAIL,
                    meta: (action, state, res) => {
                        notie.alert(3, 'request failed...', 1);
                        return metaForFetchFail(res);
                    }
                }
            ]
        }
    };
}

export const GET_DIARIES_BY_MONTH_REQUEST = 'GET_DIARIES_BY_MONTH_REQUEST';
export const GET_DIARIES_BY_MONTH_SUCCESS = 'GET_DIARIES_BY_MONTH_SUCCESS';
export const GET_DIARIES_BY_MONTH_FAIL = 'GET_DIARIES_BY_MONTH_FAIL';

/**
 * 按年、月查询日记列表
 *
 * @param {string|number} year 年
 * @param {string|number} month 月
 *
 * @exports
 */
export function getDiariesByMonth(year, month) {
    return (dispatch, getState) => {
        let {diary} = getState();
        // 日记按月归类的map中的key
        let dateKey = `${year}-${month}`;
        let diaryOfKey = diary.list.get(dateKey);
        
        // 若有缓存则不再请求，因为该action只是取by month的
        // 日记列表，如果reducer中已经存在则表示取过了
        if (!diaryOfKey || diaryOfKey.length < 1) {
            dispatch(fetchDiariesByMonth(year, month, dateKey));
        }
    };
}

/**
 * 通过年和月fetch日记列表，列表中只有dateString，不包含其他内容
 *
 * @param {string|number} year 年
 * @param {string|number} month 月
 * @param {string} dateKey reducer中list相应年月的日记列表
 */
function fetchDiariesByMonth(year, month, dateKey) {
    return {
        [CALL_API]: {
            endpoint: `${fileApi}/findByMonth?year=${year}&month=${month}`,
            method: 'GET',
            types: [
                GET_DIARIES_BY_MONTH_REQUEST,
                {
                    type: GET_DIARIES_BY_MONTH_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json()
                            .then(json => {
                                if (json.errno === 0 && json.data) {
                                    return json.data;
                                }
                                else {
                                    notie.alert(3, 'fetch diary list failed...', 1);
                                    return null;
                                };
                            });
                    },
                    meta: () => {
                        return dateKey;
                    }
                },
                {
                    type: GET_DIARIES_BY_MONTH_FAIL,
                    meta: (action, state, res) => {
                        notie.alert(3, 'request failed...', 1);
                        return metaForFetchFail(res);
                    }
                }
            ]
        }
    };
}

/**
 * 请求失败时通用的meta信息
 * 
 * @param {Object} res fetch api返回的response对象
 * @return {Object} meta信息
 */
function metaForFetchFail(res) {
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
