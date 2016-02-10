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

let curDate = new Date();
let rawMonth = curDate.getMonth() + 1 + '';
let fullMonth = rawMonth.length > 1 ? rawMonth : ('0' + rawMonth);
// 格式：2015-01
let curKey = `${curDate.getFullYear()}-${fullMonth}`;

const initialState = {
    isFetching: false,
    curKey,
    // 日记列表，按年和月分map，
    // 如2015-10的日记存储格式为map('2015-10', [{}, {}...])
    list: new Map()
};

export default function diary(state = initialState, action) {
    let payload;

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
            payload = action.payload;
            // 未取到数据，payload都为null，可以以此为判断条件
            if (payload == null) {
                return state;
            }

            let newDiary = {
                dateString: payload.dateString,
                id: payload.id,
                title: payload.title,
                content: payload.content
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
            payload = action.payload;
            let dateKey = action.meta;

            return Object.assign({}, state, {
                isFetching: false,
                curKey: dateKey,
                list: state.list.set(dateKey, payload)
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
