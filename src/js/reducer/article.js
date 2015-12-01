import { 
    ADD_ARTICLE, 
    RECEIVE_ALL_ARTICLE
} from '../action/articleAction';
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

export default function article(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return [
                action.data,
                ...state
            ];
            break;
        case RECEIVE_ALL_ARTICLE:
            return [
                action.data,
                ...state
            ];
            break;
        default:
            return state;    
    }
}
