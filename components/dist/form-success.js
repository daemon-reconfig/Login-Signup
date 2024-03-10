"use strict";
exports.__esModule = true;
exports.FormSuccess = void 0;
var react_icons_1 = require("@radix-ui/react-icons");
exports.FormSuccess = function (_a) {
    var successes = _a.successes;
    if (!successes)
        return null;
    return (React.createElement("div", { className: "flex items-center gap-x-2 text-emerald-500 bg-emerald-500/15 rounded-md p-2 text-bold" },
        React.createElement(react_icons_1.CheckCircledIcon, { className: "h-4 w-4" }),
        React.createElement("p", null, successes)));
};
