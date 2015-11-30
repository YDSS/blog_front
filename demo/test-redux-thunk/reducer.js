export default function request(state=[], action) {
    switch (action.type) {
        case 'request_post':
            return state;
            break;
        case 'receive_post':
            return [
                action.data,
                ...state
            ];
            break;
        default:
            return state; 
    }
}
