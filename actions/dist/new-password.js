"use server";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.newPassword = void 0;
var password_reset_t_1 = require("@/data/password-reset-t");
var user_1 = require("@/data/user");
var schemas_1 = require("@/schemas");
var bcryptjs_1 = require("bcryptjs");
var db_1 = require("@/lib/db");
exports.newPassword = function (values, token) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, password, existToken, hasExpired, existUser, hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    return [2 /*return*/, { error: "No Token!" }];
                }
                validated = schemas_1.NewPasswordSchema.safeParse(values);
                if (!validated.success) {
                    return [2 /*return*/, { error: "Invalid Password" }];
                }
                password = validated.data.password;
                return [4 /*yield*/, password_reset_t_1.getPasswordResetT(token)];
            case 1:
                existToken = _a.sent();
                if (!existToken) {
                    return [2 /*return*/, { error: "Invalid Token!" }];
                }
                hasExpired = new Date(existToken.expires) < new Date();
                if (hasExpired) {
                    return [2 /*return*/, { error: "Token Expired!" }];
                }
                return [4 /*yield*/, user_1.getUser(existToken.email)];
            case 2:
                existUser = _a.sent();
                if (!existUser) {
                    return [2 /*return*/, { error: "User not found!" }];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, db_1.db.user.update({
                        where: { id: existUser.id },
                        data: {
                            password: hashedPassword
                        }
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, db_1.db.passwordResetToken["delete"]({
                        where: { id: existToken.id }
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/, { success: "Password Updated!" }];
        }
    });
}); };