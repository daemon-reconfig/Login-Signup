"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUser } from "@/data/user";
import { generateTokens, generateTwoFactor } from "@/lib/tokens";
import { getTwoFactorE } from "@/data/two-factor-t";
import { sendEmail, twoFactor } from "@/lib/mail";
import { db } from "@/lib/db";
import { getTwoFactorConfirm } from "@/data/two-factor-confirm";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);
    if(!validated.success) {
        return {error : "Invalid Fields"};
    }
    const {email, password, code} = validated.data;
    const existUser  = await getUser(email);
    if(!existUser || !existUser.email || !existUser.password) {
        return {error: "Email doesn not exist!"}
    }
    if(!existUser.emailVerified) {
        const verificationToken = await generateTokens(existUser.email);
        await sendEmail(
            verificationToken.email,
            verificationToken.token,
        );
        return {success: "Email Sent!"}
    }
    if(!existUser.isTwoFactorEnabled && existUser.email) {
        if (code){
            console.log("code", code);
            
            const twoFactorToken = await getTwoFactorE(existUser.email);
            
            if(!twoFactorToken || Number(twoFactorToken.token) !== Number(code)){
                
                return {error: "Invalid Code!"}
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired){
                return {error: "Code Expired!"}
            }

            await db.twoFactorToken.delete({
                where: {
                    id: existUser.id,
                }
            });

            const existConfirm = await getTwoFactorConfirm(existUser.id);
            if(existConfirm){
                await db.twoFactorConfirm.delete({
                    where: {id: existConfirm.id}
                });
            }

            await db.twoFactorConfirm.create({
                data: {
                    userId: existUser.id,
                }
            });

        }
        else{
            const twoFactorToken = await generateTwoFactor(existUser.email);
            await twoFactor(
                twoFactorToken.email,
                twoFactorToken.token,
            );
            return {twoFactor: true}
        }
    }
    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch(error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"}
                default:
                    return {error: "Something went wrong!"}   

            }
        }
        throw error;
    }
};