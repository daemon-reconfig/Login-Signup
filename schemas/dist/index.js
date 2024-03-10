"use strict";
exports.__esModule = true;
exports.SignUpSchema = exports.LoginSchema = exports.ResetSchema = exports.NewPasswordSchema = void 0;
var z = require("zod");
exports.NewPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password is required!" })
});
exports.ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    })
});
exports.LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(8, { message: "Password is required!" })
});
exports.SignUpSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(8, { message: "Password is required!" }),
    name: z.string().min(3, { message: "Name is required!" })
});
