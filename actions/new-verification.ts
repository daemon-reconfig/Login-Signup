"use server";

import {db} from "@/lib/db";
import { getUser } from "@/data/user";
import { getVerificationTokenT } from "@/data/verification-t";

export const newVerification = async (token: string) => {
    const existToken = await getVerificationTokenT(token);
    if(!existToken) {
        return {error: "Invalid Token!"};
    }

    const hasExpired = new Date() > new Date(existToken.expires);

    if (hasExpired) {
        return {error: "Token has expired!"};
    }
    const existUser = await getUser(existToken.email);

    if(!existUser) {
        return {error: "User does not exist!"};
    }
    await db.user.update({
        where: {id: existUser.id},
        data: {
            emailVerified: new Date(),
            email: existToken.email,
        }
    });

    await db.verificationToken.delete({
        where: {id: existToken.id}
    });

    return {success: "Email Verified!"};
};