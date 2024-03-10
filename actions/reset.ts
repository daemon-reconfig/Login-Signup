"use server";

import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { getUser } from "@/data/user";
import { generatePasswordReset } from "@/lib/tokens";
import { sendPassword } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validated = ResetSchema.safeParse(values);
    if(!validated.success) {
        return {error : "Invalid Email"};
    }
    const {email} = validated.data;
    const existUser  = await getUser(email);
    if(!existUser || !existUser.email) {
        return {error: "Email doesn not exist!"}
    }
    const passwordResetToken = await generatePasswordReset(email);
    await sendPassword(passwordResetToken.email, passwordResetToken.token);
    return {success: "Email Sent!"}
}