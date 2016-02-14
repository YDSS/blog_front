import { 
    ADD_ARTICLE_SUCCESS, 
    GET_ARTICLE_BY_PAGE_SUCCESS,
    UPDATE_CURRENT_PAGE
} from '../action/articleAction';

let initialState = {
    // 当前分页的页码,从1开始计数
    curPage: 1,
    // 每页文章数
    pageSize: 10,
    // 文章总数
    articleSum: 0,
    // 文章列表
    list: new Map()
};

export default function article(state = initialState, action) {
    let {list} = state;

    switch (action.type) {
        case ADD_ARTICLE_SUCCESS:
            // 每新增一条，加到第一页的首位（文章顺序按时间倒序）
            let firstList = list.get(1);
            firstList.unshift(action.payload);
            return Object.assign({}, state, {
                articleSum: ++state.articleSum,
                list 
            });
            break;
        case GET_ARTICLE_BY_PAGE_SUCCESS:
            var {curPage, pageList, articleSum} = action.payload;
            if (pageList) {
                // 将当前页的数据按 curPage: list 的键值对格式放到state中
                list.set(curPage, pageList);
            }

            return Object.assign({}, state, {
                curPage,
                articleSum,
                list
            });
            break;
        case UPDATE_CURRENT_PAGE:
            var {curPage} = action.payload; 

            return Object.assign({}, state, {
                curPage
            });
        default:
            return state;    
    }
}
