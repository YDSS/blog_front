import {CALL_API} from 'redux-api-middleware';
import notie from 'notie';
import Util from '../mixin/util';

// 文章接口的url前缀
const articleApi = '/api/article';

export const ADD_ARTICLE_REQUEST = 'ADD_ARTICLE_REQUEST';
export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
export const ADD_ARTICLE_FAIL = 'ADD_ARTICLE_FAIL';

/**
 * 添加文章接口
 *
 * @param {string} raw 文章内容
 * 
 * @exports
 */
export function addArticle(raw) {
    return dispatch => {
        return dispatch(addArticleRSSA(raw));
    }
}
    
/**
 * 新增文章RSSA
 *
 * @param {string} raw 文章内容
 * @return {Object} RSSA
 */
function addArticleRSSA(raw) {
    return {
        [CALL_API]: {
            endpoint: `${articleApi}/add`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: encodeURIComponent(raw) 
            }),
            types: [
                ADD_ARTICLE_REQUEST, 
                {
                    type: ADD_ARTICLE_SUCCESS, 
                    payload: (action, state, res) => {
                        return res.json()
                            .then(json => {
                                if (json.errno !== 0) {
                                    notie.alert(3, 'add article failed...', 1);
                                    return null;
                                }
                                
                                notie.alert(1, 'add article success!', 1);
                                return json.data;
                            })
                            .catch(err => {
                                console.log(err.message);   
                            });
                    }
                },
                {
                    type: ADD_ARTICLE_FAIL,
                    meta: (action, state, res) => {
                        notie.alert(3, 'request failed...', 1);
                        return Util.metaForFetchFail(res);
                    }
                }
            ]
        }
    };
}

export const GET_ARTICLE_BY_PAGE_REQUEST = 'GET_ARTICLE_BY_PAGE_REQUEST';
export const GET_ARTICLE_BY_PAGE_SUCCESS = 'GET_ARTICLE_BY_PAGE_SUCCESS';
export const GET_ARTICLE_BY_PAGE_FAIL = 'GET_ARTICLE_BY_PAGE_FAIL';

/**
 * 加载分页数据
 * 
 * @param {number} curPage 当前页码
 * @param {number} pageSize 每页文章数
 *
 * @exports
 */
export function loadArticleByPage(curPage, pageSize) {
    // 现在只有一种取翻页的方式，暂时写死
    let type = 'pagination';

    return dispatch => {
        return dispatch(fetchArticleByPage(type, curPage, pageSize));
    }
}

/**
 * 取后端翻页数据
 *
 * @param {string} type 通过何种方式取分页数据
 * @param {number} curPage 当前页码
 * @param {number} pageSize 每页个数
 *
 * @return {Object} RSSA
 */
export function fetchArticleByPage(type, curPage, pageSize) {
    return {
        [CALL_API]: {
            endpoint: `${articleApi}/find?type=${type}&curPage=${curPage}&pageSize=${pageSize}`,
            method: 'GET',
            types: [
                GET_ARTICLE_BY_PAGE_REQUEST,
                {
                    type: GET_ARTICLE_BY_PAGE_SUCCESS,
                    payload: (action, state, res) => {
                        return res.json()
                            .then(json => {
                                if (json.errno !== 0) {
                                    notie.alert(3, 'fetch pagenation data failed...', 1);
                                    return null;
                                }
                                
                                let data = json.data;
                                return {
                                    curPage,
                                    articleSum: data.articleSum,
                                    pageList: data.list
                                }
                            })
                            .catch(err => {
                                console.log(err.message);   
                            });
                    }
                },
                {
                    type: GET_ARTICLE_BY_PAGE_FAIL,
                    meta: (action, state, res) => {
                        notie.alert(3, 'request failed...', 1);
                        return Util.metaForFetchFail(res);
                    }
                }
            ]
        }
    };
}

export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

export function updateCurPage(curPage) {
    return {
        type: UPDATE_CURRENT_PAGE,
        payload: {
            curPage
        }
    };
}

