"use strict";
exports.__esModule = true;
exports.ErrorCard = void 0;
var card_wrapper_1 = require("./card-wrapper");
var react_icons_1 = require("@radix-ui/react-icons");
exports.ErrorCard = function () {
    return (React.createElement(card_wrapper_1.CardWrapper, { headerLabel: "Oops! Looks like something went wrong", backButtonHref: "/auth/login", backButtonLabel: "Go Back" },
        React.createElement("div", { className: "w-full flex justify-center items-center" },
            React.createElement(react_icons_1.ExclamationTriangleIcon, { className: "text-destructive" }))));
};
