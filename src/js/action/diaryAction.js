import fetch from 'isomorphic-fetch';

export const UPLOAD_DIARY_REQUEST = 'UPLOAD_DIARY_REQUEST';
export const UPLOAD_DIARY_SUCCESS = 'UPLOAD_DIARY_SUCCESS';
export const UPLOAD_DIARY_FAIL = 'UPLOAD_DIARY_FAIL';

const fileApi = '/api/file';

function saveUpload(data) {
    return {
        type: UPLOAD_DIARY_SUCCESS,
        data
    };
}

function requestUpload() {
    return {
        type: UPLOAD_DIARY_REQUEST
    };
}

function uploadFail(data) {
    return {
        type: UPLOAD_DIARY_FAIL,
        data
    };
}

/**
 * 上传日记
 *
 * @param {FormData} file 包含上传文件的表单数据
 */
export function upload(file) {
    return (dispatch, getState) => {
        // 正在上传，置isFetching为true，防止重复提交
        dispatch(requestUpload());

        return fetch(`${fileApi}/upload`, {
            method: 'post',
            body: file
        })
            .then(response => response.json())
            .then(ret => {
                if (ret.errno === 0) {
                    dispatch(saveUpload(ret.data));
                }
                else {
                    dispatch(uploadFail(ret.err));
                }
            }, err => {
                dispatch(uploadFail(err.message));     
            })
            .catch(err => {
                dispatch(uploadFail(err.message));   
            });
    }
}
        
export const GET_DIARY_REQUEST = 'GET_DIARY_REQUEST';
export const GET_DIARY_SUCCESS = 'GET_DIARY_SUCCESS';
export const GET_DIARY_FAIL = 'GET_DIARY_FAIL';

function requestDiary() {
    return {
        type: GET_DIARY_REQUEST
    };
}

function saveDiary(data) {
    return {
        type: GET_DIARY_SUCCESS,
        data
    };
}

function getDiaryFail(data) {
    return {
        type: GET_DIARY_FAIL,
        data
    };
}

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
        let index = list.find(item => item.dateString === dateString);
        if (index) {
            return list[index];
        }
        else {
            dispatch(requestDiary());
            return fetch(`${fileApi}/find?dateString=${dateString}`)
                .then(response => response.json())
                .then(ret => {
                    if (ret.errno === 0 && ret.date) {
                        dispatch(saveDiary(ret.data));
                        return ret.data;
                    }
                    else {
                        dispatch(getDiaryFail());
                        return ret.err || ret.data;
                    }
                }, err => {
                    dispatch(getDiaryFail());
                    return err.message;
                })
                .catch(err => {
                    dispatch(getDiaryFail());
                    return err.message;
                });
        }
    }
}

