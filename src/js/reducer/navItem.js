const initialState = [
    {
        name: 'HOME',
        icon: 'home',
        url: '/home'
    },
    {
        name: 'EDIT',
        icon: 'pencil',
        url: '/edit'
    },
    {
        name: 'TAG',
        icon: 'tags',
        url: '/tag'
    },
    {
        name: 'ABOUT',
        icon: 'question',
        url: '/about'
    },
    {
        name: 'GITHUB',
        icon: 'github',
        url: 'http://github.com/YDSS'
    }
];

export default function navItem(state = initialState, action) {
    switch (action.type) {
        default:
            return state;    
    }
}
