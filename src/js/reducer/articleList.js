import { getTitleAndAbs } from '../mixin/analyzeContent';

const initialState = [
    {
        id: '123',
        title: 'test1111',
        abs: 'Protocol Buffers具体参见 Google 开发文档： https: //develop',
        time: '2015.11.07',
        url: '/article/:123',
        tags: [
            'node',
            'react',
            'requirejs'
        ]
    },
    {
        id: '456',
        title: 'study Redux',
        abs: 'It\'s really interesting!',
        time: '2015.11.18',
        url: '/article/:456',
        tags: [
            'react',
            'redux'
        ]
    }
];

export default function articleList(state = initialState, action) {
    switch (action.type) {
        case 'add_article':
            let { title, abs } = getTitleAndAbs(action.content);

            return [
                {
                    id: '567',
                    title: title,
                    abs: abs,
                    time: '2015.11.21',
                    url: '/article/:567'
                },
                ...state
            ];
        default:
            return state;    
    }
}
