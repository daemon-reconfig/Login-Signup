"use strict";
exports.__esModule = true;
exports.Header = void 0;
;
exports.Header = function (_a) {
    var label = _a.label;
    return (React.createElement("div", { className: "w-full flex flex-col gap-y-4 items-center justify-center" },
        React.createElement("h1", { className: "text-4xl font-semibold  drop-shadow-md" }, "Auth"),
        React.createElement("p", { className: "text-muted-foreground text-sm" }, label)));
};
