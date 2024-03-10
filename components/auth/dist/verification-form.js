"use client";
"use strict";
exports.__esModule = true;
exports.VerificationForm = void 0;
var card_wrapper_1 = require("./card-wrapper");
var react_1 = require("react");
var react_2 = require("react");
var react_spinners_1 = require("react-spinners");
var navigation_1 = require("next/navigation");
var new_verification_1 = require("@/actions/new-verification");
var form_success_1 = require("../form-success");
var form_errors_1 = require("../form-errors");
exports.VerificationForm = function () {
    var _a = react_2.useState(), error = _a[0], setError = _a[1];
    var _b = react_2.useState(), success = _b[0], setSuccess = _b[1];
    var searchParams = navigation_1.useSearchParams();
    var token = searchParams.get("token");
    var onSubmit = react_1.useCallback(function () {
        if (success || error)
            return;
        if (!token) {
            setError("Missing Token");
            return;
        }
        new_verification_1.newVerification(token)
            .then(function (data) {
            setSuccess(data.success);
            setError(data.error);
        })["catch"](function () {
            setError("Something broke!");
        });
    }, [token, success, error]);
    react_2.useEffect(function () {
        onSubmit();
    }, [onSubmit]);
    return (React.createElement(card_wrapper_1.CardWrapper, { headerLabel: "Confirming your verification", backButtonHref: "/auth/login", backButtonLabel: "Back to login", showSocial: false },
        React.createElement("div", { className: "flex items-center w-full justify-center" },
            !success && !error && (React.createElement(react_spinners_1.BeatLoader, null)),
            React.createElement(form_success_1.FormSuccess, { successes: success }),
            !success && (React.createElement(form_errors_1.FormErrors, { errors: error })))));
};
