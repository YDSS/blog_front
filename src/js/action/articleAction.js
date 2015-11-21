export const ADD_ARTICLE = 'add_article';

export function addArticle(content) {
    return {
        type: ADD_ARTICLE,
        content
    };
}
