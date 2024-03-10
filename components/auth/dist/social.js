"use client";
"use strict";
exports.__esModule = true;
exports.Social = void 0;
var react_1 = require("next-auth/react");
var button_1 = require("../ui/button");
var fc_1 = require("react-icons/fc"); // Import the FcGoogle component from the 'react-icons/fc' package
var fa_1 = require("react-icons/fa"); // Import the FaGithub component from the 'react-icons/fa' package
var routes_1 = require("@/routes");
exports.Social = function () {
    var onClick = function (provider) {
        react_1.signIn(provider, {
            callbackUrl: routes_1.DEFAULT_LOGIN_REDIRECT
        });
    };
    return (React.createElement("div", { className: "flex items-center w-full gap-x-2" },
        React.createElement(button_1.Button, { size: "lg", className: "w-full", variant: "outline", onClick: function () { return onClick("google"); } },
            React.createElement(fc_1.FcGoogle, { className: "h-5 w-5" })),
        React.createElement(button_1.Button, { size: "lg", className: "w-full", variant: "outline", onClick: function () { return onClick("github"); } },
            React.createElement(fa_1.FaGithub, { className: "h-5 w-5" }))));
};
