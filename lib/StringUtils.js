
module.exports = function (context) {
    return context
            .replace(/\n/g, '')
            .replace(/ /g, '')
            .replace('Lv.', '');
}