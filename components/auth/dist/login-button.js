"use client";
"use strict";
exports.__esModule = true;
exports.LoginButton = void 0;
var navigation_1 = require("next/navigation");
;
exports.LoginButton = function (_a) {
    var children = _a.children, _b = _a.mode, mode = _b === void 0 ? "redirect" : _b, asChild = _a.asChild;
    var router = navigation_1.useRouter();
    var onClick = function () {
        router.push("/auth/login");
    };
    if (mode === "modal") {
        return (React.createElement("p", null, children));
    }
    return (React.createElement("span", { onClick: onClick, className: "cursor-pointer" }, children));
};
