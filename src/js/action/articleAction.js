import fetch from 'isomorphic-fetch';

export const ADD_ARTICLE = 'add_article';

export function addArticle(content) {
    content = encodeURIComponent(content);

    return dispatch => {
        return fetch(`/api/article/add?content=${content}`)
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

export const FETCH_ARTICLE_BY_PAGE = 'fetch_article_by_page';

/**
 * 从后端取分页数据
 * 
 * @param {number} curPage 当前页码
 * @param {number} pageSize 每页文章数
 */
export function fetchArticleByPage(curPage, pageSize) {
    let type = 'pagination';

    return dispatch => {
        return fetch(`/api/article/find?type=${type}&curPage=${curPage}&pageSize=${pageSize}`)
            .then(req => req.json())
            .then(ret => {
                dispatch(dispatchFetchArticleByPage(curPage, ret.data));
            });
    }
}

export const UPDATE_CURRENT_PAGE = 'update_current_page';

export function updateCurPage(curPage) {
    return {
        type: UPDATE_CURRENT_PAGE,
        data: {
            curPage
        }
    };
}

/**
 * 分发翻页数据
 *
 * @param {number} curPage 当前页码
 * @param {Object} data 服务端取回的数据
 */
export function dispatchFetchArticleByPage(curPage, data) {
    return {
        type: FETCH_ARTICLE_BY_PAGE,
        data: {
            curPage,
            articleSum: data.articleSum,
            pageList: data.list
        }
    }
}
