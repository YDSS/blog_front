import fetch from 'isomorphic-fetch';

export const ADD_ARTICLE = 'add_article';

export function postNewArticle(content) {
    content = encodeURIComponent(content);

    return dispatch => {
        return fetch(`/article/add?content=${content}`)
            .then(response => response.json())
            .then(article => {
                dispatch(addArticle(article));
            });
    }
}
    
export function addArticle(article) {
    return {
        type: ADD_ARTICLE,
        data: article 
    };
}

export const RECEIVE_ALL_ARTICLE = 'receive_all_article';

export function fetchAllArticle() {
    return dispatch => {
        return fetch('/article/find')
            .then(response => response.json())
            .then(articles => {
                dispatch(receiveAllArticle(articles));
            });
    }
}

export function receiveALlArticle(articles) {
    return {
        type: RECEIVE_ALL_ARTICLE,
        data: articles
    }
}
