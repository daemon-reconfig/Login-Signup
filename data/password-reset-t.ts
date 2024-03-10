import { db} from "@/lib/db";

export const getPasswordResetT = async (token: string) => {
    try{
        const resetToken = await db.passwordResetToken.findFirst({
            where: {
                token,
            },
        });
        return resetToken;
    } catch {
        return null;
    }
};
export const getPasswordResetE = async (email: string) => {
    try{
        const resetToken = await db.passwordResetToken.findFirst({
            where: {
                email,
            },
        });
        return resetToken;
    } catch {
        return null;
    }
};