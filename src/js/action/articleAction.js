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
                dispatch(dispatchGetArticleByPage(ret.data));
            });
    }
}

function dispatchGetArticleByPage(articles) {
    return {
        type: GET_ARTICLE_BY_PAGE,
        data: articles
    }
}

export const PAGINATE = 'paginate';

export function paginate(pageNum) {
    return {
        type: PAGINATE,
        data: pageNum
    }
}
