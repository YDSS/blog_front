// 数据由后端渲染
const initialState = serverData.navItems;

export default function navItem(state = initialState, action) {
    switch (action.type) {
        default:
            return state;    
    }
}
