"use server";
import bcrypt from "bcryptjs";
import {db} from "@/lib/db";
import { SignUpSchema } from "@/schemas";
import * as z from "zod";
import { getUser } from "@/data/user";
import { generateTokens } from "@/lib/tokens";
import { sendEmail } from "@/lib/mail";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
    const validated = SignUpSchema.safeParse(values);
    if(!validated.success) {
        return {error : "Invalid Fields"};
    }
    const {email, password, name} = validated.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existUser  = await getUser(email);
    if(existUser) {
        return {error: "User already exists"};
    }
    await db.user.create({
       data: {
              email,
              password: hashedPassword,
              name,
       } 
    })
    const verificationToken = await generateTokens(email);
    await sendEmail(
        verificationToken.email,
        verificationToken.token,
    );
    return {success: "Email sent!"};
}