import { 
    ADD_ARTICLE_SUCCESS, 
    UPDATE_ARTICLE_SUCCESS,
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
    let {payload} = action;
    let curPage;
    let firstList = [];

    switch (action.type) {
        case ADD_ARTICLE_SUCCESS:
            // 每新增一条，加到第一页的首位（文章顺序按时间倒序）
            firstList = list.get(1);
            firstList.unshift(payload);
            return Object.assign({}, state, {
                articleSum: ++state.articleSum,
                list 
            });
            break;
        case UPDATE_ARTICLE_SUCCESS:
            // 编辑的文章所在curPage在编辑后没有变化，因此直接从cache中取
            curPage = state.curPage;    
            // 删除原来位置的文章
            let newPageList = state.list.get(curPage).filter(item => {
                return item.id !== payload.id;
            });
            state.list.set(curPage, newPageList);
            // 修改后的文章置顶，排序跟后端保持一致
            firstList = list.get(1);
            firstList.unshift(payload);

            return Object.assign({}, state, {
                list
            });
            break;
        case GET_ARTICLE_BY_PAGE_SUCCESS:
            curPage = payload.curPage;
            let {pageList, articleSum} = payload;
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
            curPage = payload.curPage; 

            return Object.assign({}, state, {
                curPage
            });
        default:
            return state;    
    }
}
