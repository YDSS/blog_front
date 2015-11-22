// matching rules:
// any charactor follows '#' until '\n'  will be title
// charactor between first '\n' and the second is abstract
const re = /^#\s?([^\n]+)\n([^\n]*)/;

export function getTitleAndAbs(content) {
    if (!content || typeof content !== 'string') {
        return;
    }

    let ret = content.match(re);

    return {
        title: ret[1],
        abs: ret[2] || ''
    }
}
