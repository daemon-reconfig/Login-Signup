"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUser } from "@/data/user";
import { generateTokens } from "@/lib/tokens";
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);
    if(!validated.success) {
        return {error : "Invalid Fields"};
    }
    const {email, password} = validated.data;
    const existUser  = await getUser(email);
    if(!existUser || !existUser.email || !existUser.password) {
        return {error: "Email doesn not exist!"}
    }
    if(!existUser.emailVerified) {
        const verificationToken = await generateTokens(existUser.email);
        return {success: "Email Sent!"}
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