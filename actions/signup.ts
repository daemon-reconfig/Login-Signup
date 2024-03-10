"use server";
import bcrypt from "bcrypt";
import {db} from "@/lib/db";
import { SignUpSchema } from "@/schemas";
import * as z from "zod";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
    const validated = SignUpSchema.safeParse(values);
    if(!validated.success) {
        return {error : "Invalid Fields"};
    }
    const {email, password, name} = validated.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existUser  = await db.user.findUnique({
        where: {
            email,
        }
    })
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
    return {success: "Email sent!"};
}