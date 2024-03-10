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
exports.login = void 0;
var schemas_1 = require("@/schemas");
var auth_1 = require("@/auth");
var routes_1 = require("@/routes");
var next_auth_1 = require("next-auth");
var user_1 = require("@/data/user");
var tokens_1 = require("@/lib/tokens");
var two_factor_t_1 = require("@/data/two-factor-t");
var mail_1 = require("@/lib/mail");
var db_1 = require("@/lib/db");
exports.login = function (values) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, _a, email, password, code, existUser, verificationToken, twoFactorToken, hasExpired, existConfirm, twoFactorToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validated = schemas_1.LoginSchema.safeParse(values);
                if (!validated.success) {
                    return [2 /*return*/, { error: "Invalid Fields" }];
                }
                _a = validated.data, email = _a.email, password = _a.password, code = _a.code;
                return [4 /*yield*/, user_1.getUser(email)];
            case 1:
                existUser = _b.sent();
                if (!existUser || !existUser.email || !existUser.password) {
                    return [2 /*return*/, { error: "Email doesn not exist!" }];
                }
                if (!!existUser.emailVerified) return [3 /*break*/, 4];
                return [4 /*yield*/, tokens_1.generateTokens(existUser.email)];
            case 2:
                verificationToken = _b.sent();
                return [4 /*yield*/, mail_1.sendEmail(verificationToken.email, verificationToken.token)];
            case 3:
                _b.sent();
                return [2 /*return*/, { success: "Email Sent!" }];
            case 4:
                if (!(!existUser.twoFactorEnabled && existUser.email)) return [3 /*break*/, 14];
                if (!code) return [3 /*break*/, 11];
                console.log("code", code);
                return [4 /*yield*/, two_factor_t_1.getTwoFactorE(existUser.email)];
            case 5:
                twoFactorToken = _b.sent();
                if (!twoFactorToken || Number(twoFactorToken.token) !== Number(code)) {
                    return [2 /*return*/, { error: "Invalid Code!" }];
                }
                hasExpired = new Date(twoFactorToken.expires) < new Date();
                if (hasExpired) {
                    return [2 /*return*/, { error: "Code Expired!" }];
                }
                return [4 /*yield*/, db_1.db.twoFactorToken["delete"]({
                        data: {
                            userId: existUser.id
                        }
                    })];
            case 6:
                _b.sent();
                return [4 /*yield*/, db_1.db.twoFactorConfirm(existUser.id)];
            case 7:
                existConfirm = _b.sent();
                if (!existConfirm) return [3 /*break*/, 9];
                return [4 /*yield*/, db_1.db.twoFactorConfirm["delete"]({
                        where: { id: existConfirm.id }
                    })];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [4 /*yield*/, db_1.db.twoFactorConfirm.create({
                    data: {
                        userId: existUser.id
                    }
                })];
            case 10:
                _b.sent();
                return [3 /*break*/, 14];
            case 11: return [4 /*yield*/, tokens_1.generateTwoFactor(existUser.email)];
            case 12:
                twoFactorToken = _b.sent();
                return [4 /*yield*/, mail_1.twoFactor(twoFactorToken.email, twoFactorToken.token)];
            case 13:
                _b.sent();
                return [2 /*return*/, { twoFactor: true }];
            case 14:
                _b.trys.push([14, 16, , 17]);
                return [4 /*yield*/, auth_1.signIn("credentials", {
                        email: email,
                        password: password,
                        redirectTo: routes_1.DEFAULT_LOGIN_REDIRECT
                    })];
            case 15:
                _b.sent();
                return [3 /*break*/, 17];
            case 16:
                error_1 = _b.sent();
                if (error_1 instanceof next_auth_1.AuthError) {
                    switch (error_1.type) {
                        case "CredentialsSignin":
                            return [2 /*return*/, { error: "Invalid credentials!" }];
                        default:
                            return [2 /*return*/, { error: "Something went wrong!" }];
                    }
                }
                throw error_1;
            case 17: return [2 /*return*/];
        }
    });
}); };
