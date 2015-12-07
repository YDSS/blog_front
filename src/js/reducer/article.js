import { 
    ADD_ARTICLE, 
    GET_ARTICLE_BY_PAGE,
    PAGINATE
} from '../action/articleAction';

let initialState = {
    // 当前分页的页码
    curPage: 1,
    // 每页文章数
    pageSize: 10,
    // 文章总数
    pageSum: 0,
    // 文章列表
    list: []
};

export default function article(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return Object.assign({}, state, {
                pageSum: ++state.pageSum,
                list: [
                    action.data,
                    ...state.list
                ]
            });
            break;
        case GET_ARTICLE_BY_PAGE:
            return Object.assign({}, state, {
                pageSum: action.data.pageSum,
                list: [
                    ...state.list,
                    ...action.data.list
                ]
            });
            break;
        case PAGINATE:
            return Object.assign({}, state, {
                curPage: action.data
            });
            break;
        default:
            return state;    
    }
}
