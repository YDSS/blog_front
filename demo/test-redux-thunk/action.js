export const REQUEST_POST = 'request_post';

export function request(param) {
    return dispatch => {
        return fetch(`//127.0.0.1:8888/article.json?id=${param.id}`)
            .then(response => response.json())
            .then(article => {
                return dispatch(receive(article));
            });
    };
}

export const RECEIVE_POST = 'receive_post';

function receive(data) {
    return {
        type: RECEIVE_POST,
        data
    };
}
