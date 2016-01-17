import {
    UPLOAD_DIARY_REQUEST,
    UPLOAD_DIARY_SUCCESS,
    UPLOAD_DIARY_FAIL,
    GET_DIARY_REQUEST,
    GET_DIARY_SUCCESS,
    GET_DIARY_FAIL,
    GET_DIARIES_BY_MONTH_REQUEST,
    GET_DIARIES_BY_MONTH_SUCCESS,
    GET_DIARIES_BY_MONTH_FAIL
} from '../action/diaryAction';

const initialState = {
    isFetching: false,
    // list diary object
    list: []
};

export default function diary(state = initialState, action) {
    let data;

    switch (action.type) {
        case UPLOAD_DIARY_REQUEST:
        case GET_DIARY_REQUEST:
        case GET_DIARIES_BY_MONTH_REQUEST:
            return Object.assign({}, state, {
                isFetching: true                     
            }); 
            break;

        case UPLOAD_DIARY_SUCCESS:
        case GET_DIARY_SUCCESS:
            data = action.data;
            let newDiary = {
                dateString: data.dateString,
                id: data.id,
                title: data.title,
                content: data.content
            };
            // 如果dateString已经存在，则覆盖其他属性
            let newList = state.list.map(item => {
                if (item.dateString === newDiary.dateString) {
                    return Object.assign(item, newDiary);
                }
                else {
                    return item;
                }
            });

            return Object.assign({}, state, {
                isFetching: false,
                list: newList
            });
            break;
        
        case GET_DIARIES_BY_MONTH_SUCCESS:
            data = action.data;

            return Object.assign({}, state, {
                isFetching: false,
                list: data
            });
            break;

        case UPLOAD_DIARY_FAIL:
        case GET_DIARY_FAIL:
        case GET_DIARIES_BY_MONTH_FAIL:
            return Object.assign({}, state, {
                isFetching: false
            });
            break;
                
        default:
            return state;    
    }
}
