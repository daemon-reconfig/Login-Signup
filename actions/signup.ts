"use server";
import { SignUpSchema } from "@/schemas";
import * as z from "zod";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
    const validated = SignUpSchema.safeParse(values);
    if(!validated.success) {
        return {error : "Invalid Fields"};
    }
    return {success: "Email sent!"};
}