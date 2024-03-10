"use strict";
exports.__esModule = true;
exports.FormErrors = void 0;
var react_icons_1 = require("@radix-ui/react-icons");
exports.FormErrors = function (_a) {
    var errors = _a.errors;
    if (!errors)
        return null;
    return (React.createElement("div", { className: "flex items-center gap-x-2 text-red-500 bg-destructive/15 rounded-md p-2 " },
        React.createElement(react_icons_1.ExclamationTriangleIcon, { className: "h-4 w-4" }),
        React.createElement("p", null, errors)));
};
