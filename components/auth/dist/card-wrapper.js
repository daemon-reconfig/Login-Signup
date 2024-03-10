"use client";
"use strict";
exports.__esModule = true;
exports.CardWrapper = void 0;
var card_1 = require("../ui/card");
var back_button_1 = require("./back-button");
var header_1 = require("./header");
var social_1 = require("./social");
;
exports.CardWrapper = function (_a) {
    var children = _a.children, headerLabel = _a.headerLabel, backButtonLabel = _a.backButtonLabel, backButtonHref = _a.backButtonHref, _b = _a.showSocial, showSocial = _b === void 0 ? true : _b;
    return (React.createElement(card_1.Card, { className: "w-[400px] shadow-md" },
        React.createElement(card_1.CardHeader, null,
            React.createElement(header_1.Header, { label: headerLabel })),
        React.createElement(card_1.CardContent, null, children),
        showSocial && (React.createElement(card_1.CardFooter, null,
            React.createElement(social_1.Social, null))),
        React.createElement(card_1.CardFooter, null,
            React.createElement(back_button_1.BackButton, { label: backButtonLabel, href: backButtonHref }))));
};
