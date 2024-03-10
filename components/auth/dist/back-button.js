"use client";
"use strict";
exports.__esModule = true;
exports.BackButton = void 0;
var link_1 = require("next/link");
var button_1 = require("../ui/button");
;
exports.BackButton = function (_a) {
    var href = _a.href, label = _a.label;
    return (React.createElement(button_1.Button, { variant: "link", className: "font-normal text-muted-foreground w-full", size: "sm", asChild: true },
        React.createElement(link_1["default"], { href: href }, label)));
};
