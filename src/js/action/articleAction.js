import fetch from 'isomorphic-fetch';

export const ADD_ARTICLE = 'add_article';

export function addArticle(content) {
    content = encodeURIComponent(content);
    debugger

    return dispatch => {
        return fetch(`/article/add?content=${content}`)
            .then(req => req.json())
            .then(res => {
                debugger
                res.errno === 0 && dispatch(dispatchAddArticle(res.data));
            });
    }
}
    
function dispatchAddArticle(article) {
    return {
        type: ADD_ARTICLE,
        data: article 
    };
}

export const GET_ALL_ARTICLE = 'get_all_article';

export function getAllArticle() {
    return dispatch => {
        return fetch('/article/find')
            .then(req => req.json())
            .then(ret => {
                dispatch(dispatchGetAllArticle(ret.data));
            });
    }
}

function dispatchGetAllArticle(articles) {
    return {
        type: GET_ALL_ARTICLE,
        data: articles
    }
}
