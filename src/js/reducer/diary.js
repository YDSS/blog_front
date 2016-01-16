import {
    UPLOAD_DIARY_REQUEST,
    UPLOAD_DIARY_SUCCESS,
    UPLOAD_DIARY_FAIL,
    GET_DIARY_REQUEST,
    GET_DIARY_SUCCESS,
    GET_DIARY_FAIL
} from '../action/diaryAction';

const initialState = {
    isFetching: false,
    list: []
};

export default function diary(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_DIARY_REQUEST:
        case GET_DIARY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true                     
            }); 
            break;

        case UPLOAD_DIARY_SUCCESS:
        case GET_DIARY_SUCCESS:
            let {data} = action;
            let newDiary = {
                dateString: data.dateString,
                id: data.id,
                raw: data.raw
            };
            return Object.assign({}, state, {
                isFetching: false,
                list: [
                    newDiary,
                    ...state.list
                ]
            });
            break;

        case UPLOAD_DIARY_FAIL:
        case GET_DIARY_FAIL:
            return Object.assign({}, state, {
                isFetching: false
            });
            break;
                
        default:
            return state;    
    }
}
