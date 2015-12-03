import { 
    ADD_ARTICLE, 
    GET_ALL_ARTICLE
} from '../action/articleAction';

export default function article(state = [], action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return [
                action.data,
                ...state
            ];
            break;
        case GET_ALL_ARTICLE:
            return [
                ...action.data,
                ...state
            ];
            break;
        default:
            return state;    
    }
}
