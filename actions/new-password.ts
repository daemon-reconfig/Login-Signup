"use server";
import { getPasswordResetT } from "@/data/password-reset-t";
import { getUser } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async(
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if(!token) {
        return {error: "No Token!"}
    }

    const validated = NewPasswordSchema.safeParse(values);
    if(!validated.success) {
        return {error : "Invalid Password"};
    }
    const {password} = validated.data;
    const existToken = await getPasswordResetT(token);
    if(!existToken) {
        return {error: "Invalid Token!"}
    }
    const hasExpired = new Date(existToken.expires) < new Date();
    if(hasExpired) {
        return {error: "Token Expired!"}
    }
    const existUser = await getUser(existToken.email);
    if(!existUser) {
        return {error: "User not found!"}
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: {id: existUser.id},
        data: {
            password: hashedPassword,
        }
    });

    await db.passwordResetToken.delete({
        where: {id: existToken.id}
    });

    return {success: "Password Updated!"}
}