"use client";
"use strict";
exports.__esModule = true;
exports.Social = void 0;
var button_1 = require("../ui/button");
var fc_1 = require("react-icons/fc"); // Import the FcGoogle component from the 'react-icons/fc' package
var fa_1 = require("react-icons/fa"); // Import the FaGithub component from the 'react-icons/fa' package
exports.Social = function () {
    return (React.createElement("div", { className: "flex items-center w-full gap-x-2" },
        React.createElement(button_1.Button, { size: "lg", className: "w-full", variant: "outline", onClick: function () { } },
            React.createElement(fc_1.FcGoogle, { className: "h-5 w-5" })),
        React.createElement(button_1.Button, { size: "lg", className: "w-full", variant: "outline", onClick: function () { } },
            React.createElement(fa_1.FaGithub, { className: "h-5 w-5" }))));
};
