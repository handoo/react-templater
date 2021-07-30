module.exports = {
    capitalize: function (str) {
        let s = str;
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    replace: function (str, COMPONENT_NAME, COMPONENT_STYLE) {
        return str
            .replace(/\{COMPONENT_NAME\}/g, COMPONENT_NAME)
            .replace(/\{COMPONENT_STYLE\}/g, COMPONENT_STYLE)
    }
};
