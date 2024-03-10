import { db } from "@/lib/db";

export const getTwoFactorConfirm = async (userId: string) => {
    try{
        const twoFactorConfirm = await db.twoFactorConfirm.findUnique( {
            where: {userId}
        });
        return twoFactorConfirm;
    } catch {
        return null;
    }
}