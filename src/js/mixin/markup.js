import marked from 'marked';
import highlight from 'highlight.js/lib/index';

import 'highlight.js/styles/solarized_light.css';

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

export function rawMarkup(content) {
    return {
        __html: marked(content)
    };
}
