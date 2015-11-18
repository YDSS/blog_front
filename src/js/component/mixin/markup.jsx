import marked from 'marked';
// import highlight from 'highlight';

// marked.setOptions({
//     highlight: function (code) {
//         return highlight.highlightAuto(code).value;
//     }
// });

export function rawMarkup(content) {
    return {
        __html: marked(content)
    };
}
