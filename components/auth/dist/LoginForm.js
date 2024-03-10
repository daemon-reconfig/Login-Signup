"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.LoginForm = void 0;
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var card_wrapper_1 = require("./card-wrapper");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var schemas_1 = require("@/schemas");
var form_1 = require("../ui/form");
var input_1 = require("../ui/input");
var button_1 = require("../ui/button");
var form_errors_1 = require("../form-errors");
var form_success_1 = require("../form-success");
var login_1 = require("@/actions/login");
exports.LoginForm = function () {
    var searchParams = navigation_1.useSearchParams();
    var urlE = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
    var _a = react_1.useState(""), error = _a[0], setError = _a[1];
    var _b = react_1.useState(""), success = _b[0], setSuccess = _b[1];
    var _c = react_1.useTransition(), isPending = _c[0], startTransition = _c[1];
    var methods = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(schemas_1.LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    var onSubmit = function (values) {
        setError("");
        setSuccess("");
        startTransition(function () {
            login_1.login(values)
                .then(function (data) {
                setError(data === null || data === void 0 ? void 0 : data.error);
                setSuccess((data === null || data === void 0 ? void 0 : data.success) || "");
            });
        });
    };
    return (React.createElement(card_wrapper_1.CardWrapper, { headerLabel: "Welcome back", backButtonLabel: "Don't have an account? Sign up", backButtonHref: "/auth/signup", showSocial: true },
        React.createElement(form_1.Form, __assign({}, methods),
            React.createElement("form", { onSubmit: methods.handleSubmit(onSubmit), className: "space-y-6" },
                React.createElement("div", { className: "space-y-4" },
                    React.createElement(form_1.FormField, { control: methods.control, name: "email", render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(form_1.FormItem, null,
                                React.createElement(form_1.FormLabel, null, "Email"),
                                React.createElement(form_1.FormControl, null,
                                    React.createElement(input_1.Input, __assign({}, field, { disabled: isPending, placeholder: "youremail@email.com", type: "email" }))),
                                React.createElement(form_1.FormMessage, null)));
                        } }),
                    React.createElement(form_1.FormField, { control: methods.control, name: "password", render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(form_1.FormItem, null,
                                React.createElement(form_1.FormLabel, null, "Password"),
                                React.createElement(form_1.FormControl, null,
                                    React.createElement(input_1.Input, __assign({}, field, { disabled: isPending, placeholder: "somesecret", type: "password" }))),
                                React.createElement(form_1.FormMessage, null)));
                        } })),
                React.createElement(form_errors_1.FormErrors, { errors: error || urlE }),
                React.createElement(form_success_1.FormSuccess, { successes: success }),
                React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isPending }, "Login")))));
};
