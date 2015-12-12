import fetch from 'isomorphic-fetch';

export const ADD_ARTICLE = 'add_article';

export function addArticle(content) {
    content = encodeURIComponent(content);

    return dispatch => {
        return fetch(`/article/add?content=${content}`)
            .then(req => req.json())
            .then(res => {
                res.errno === 0 && dispatch(dispatchAddArticle(res.data));
            });
    }
}
    
function dispatchAddArticle(data) {
    return {
        type: ADD_ARTICLE,
        data
    };
}

export const GET_ARTICLE_BY_PAGE = 'get_article_by_page';

/**
 * 取分页数据
 * 
 * @param {number} curPage 当前页码
 * @param {number} pageSize 每页文章数
 */
export function getArticleByPage(curPage, pageSize) {
    let type = 'pagination';

    return dispatch => {
        return fetch(`/article/find?type=${type}&curPage=${curPage}&pageSize=${pageSize}`)
            .then(req => req.json())
            .then(ret => {
                dispatch(dispatchGetArticleByPage(curPage, ret.data));
            });
    }
}

/**
 * 分发翻页数据，分两种情况
 * 1. 若data参数存在，则数据不存在cache中，一并传给reducer
 * 2. 若data参数不存在，则数据已存在cache中，只传curPage
 *
 * @param {number} curPage 当前页码
 * @param {Object} dataFromServer 服务端取回的数据
 */
export function dispatchGetArticleByPage(curPage, dataFromServer) {
    let data;
    // cache中无当前页列表数据
    if (dataFromServer) {
        data = {
            curPage,
            articleSum: dataFromServer.articleSum,
            pageList: dataFromServer.list
        }
    }
    // cache中有数据
    else {
        data = {
            curPage
        };
    }

    return {
        type: GET_ARTICLE_BY_PAGE,
        data 
    }
}
