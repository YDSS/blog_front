import fetch from 'isomorphic-fetch';

export const ADD_ARTICLE = 'add_article';

export function addArticle(content) {
    return {
        type: ADD_ARTICLE,
        content
    };
}

export const GET_ALL_ARTICLE = 'find_article';

export function getAllArticle() {
}
