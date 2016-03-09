import {
    UPLOAD_DIARY_REQUEST,
    UPLOAD_DIARY_SUCCESS,
    UPLOAD_DIARY_FAIL,
    GET_DIARY_REQUEST,
    GET_DIARY_SUCCESS,
    GET_DIARY_FAIL,
    GET_DIARIES_BY_MONTH_REQUEST,
    GET_DIARIES_BY_MONTH_SUCCESS,
    GET_DIARIES_BY_MONTH_FAIL,
    CHANGE_KEY,
    GET_LATEST_DIARY_REQUEST,
    GET_LATEST_DIARY_SUCCESS,
    GET_LATEST_DIARY_FAIL
} from '../action/diaryAction';

import Util from '../mixin/util';

const initialState = {
    // 是否正在请求，防止重复请求
    // isFetching: false,
    // 当前日历的年、月, 格式:2016-02，随日历next(pre) year
    // 按钮切换而改变，用来定位list: map中的日记列表
    curKey: '',
    // 日记列表，按年和月分map，
    // 如2015-10的日记存储格式为map('2015-10', [{}, {}...])
    list: new Map()
};

export default function diary(state = initialState, action) {
    let payload;
    let key;
    let diaryList;
    let newDiaryList;

    switch (action.type) {
        // case UPLOAD_DIARY_REQUEST:
        // case GET_DIARY_REQUEST:
        // case GET_DIARIES_BY_MONTH_REQUEST:
        // case GET_LATEST_DIARY_REQUEST:
        //     return Object.assign({}, state, {
        //         isFetching: true                     
        //     }); 
        //     break;

        case GET_DIARY_SUCCESS:
        case GET_LATEST_DIARY_SUCCESS:
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
            key = state.curKey;
            diaryList = state.list.get(key);

            // 如果dateString已经存在，则覆盖其他属性
            newDiaryList = diaryList.map(item => {
                if (item.dateString === newDiary.dateString) {
                    return Object.assign({}, item, newDiary);
                }

                return item;
            });

            return Object.assign({}, state, {
                list: state.list.set(key, newDiaryList)
            });
            break;
        
        case UPLOAD_DIARY_SUCCESS:
            payload = action.payload;
            // 未取到数据，payload都为null，可以以此为判断条件
            if (payload == null) {
                return state;
            }
            
            let uploadDiary = {
                dateString: payload.dateString,
                id: payload.id,
                title: payload.title,
                content: payload.content
            };
            let uploadDate = Util.parseDiaryName(uploadDiary.dateString);
            // 上传diary的key由dateString解析得到
            key = `${uploadDate.year}-${uploadDate.month}`;
            diaryList = state.list.get(key);

            // upload页没有预先加载diary列表，所以diaryList可能为空
            if (!diaryList || diaryList.length === 0) {
                newDiaryList = [uploadDiary]; 
            }
            else {
                // 如果dateString已经存在，则覆盖其他属性
                newDiaryList = diaryList.map(item => {
                    if (item.dateString === uploadDiary.dateString) {
                        return Object.assign({}, item, newDiary);
                    }

                    return item;
                });
            }

            return Object.assign({}, state, {
                list: state.list.set(key, newDiaryList)
            });   
            break;

        case GET_DIARIES_BY_MONTH_SUCCESS:
            payload = action.payload;
            // 未取到数据，payload都为null，可以以此为判断条件
            if (payload == null) {
                return state;
            }

            let dateKey = action.meta;

            return Object.assign({}, state, {
                list: state.list.set(dateKey, payload)
            });
            break;

        // case UPLOAD_DIARY_FAIL:
        // case GET_DIARY_FAIL:
        // case GET_DIARIES_BY_MONTH_FAIL:
        // case GET_LATEST_DIARY_FAIL:
        //     return Object.assign({}, state, {
        //         isFetching: false
        //     });
        //     break;

        case CHANGE_KEY:
            let curKey = action.payload;

            return Object.assign({}, state, {
                curKey
            });
                
        default:
            return state;    
    }
}
