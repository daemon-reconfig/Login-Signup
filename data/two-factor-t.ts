import {db} from "@/lib/db";

export const getTwoFactorT = async (token: string) => {
    try{
        const twoFactorToken = await db.twoFactorToken.findUnique( {
            where: {token}
        });
        return twoFactorToken;
    } catch {
        return null;
    }
}
export const getTwoFactorE = async (email: string) => {
    try{
        const twoFactorToken = await db.twoFactorToken.findFirst( {
            where: {email}
        });
        console.log(twoFactorToken);
        return twoFactorToken;
    } catch {
        return null;
    }
}