"use strict";
exports.__esModule = true;
var login_button_1 = require("@/components/auth/login-button");
var button_1 = require("@/components/ui/button");
function Home() {
    return (React.createElement("main", { className: "flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800" },
        React.createElement("div", { className: "space-y-6" },
            React.createElement("h1", { className: "text-6xl font-semibold text-white drop-shadow-md" }, "Auth"),
            React.createElement(login_button_1.LoginButton, null,
                React.createElement(button_1.Button, { variant: "secondary", size: "lg" }, "Login")))));
}
exports["default"] = Home;
