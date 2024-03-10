"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("next-auth/react");
var Settings = function () {
    var session = react_1.useSession();
    var onClick = function () {
        react_1.signOut();
    };
    return (React.createElement("div", null,
        JSON.stringify(session),
        React.createElement("button", { onClick: onClick, type: "submit" }, "Sign out")));
};
exports["default"] = Settings;
