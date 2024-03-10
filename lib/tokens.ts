import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getVerificationTokenE } from '@/data/verification-t';

export const generateTokens = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1000 * 90);
    const ifExisted = await getVerificationTokenE(email);

    if(ifExisted) {
        await db.verificationToken.delete({
            where: {
                id: ifExisted.id
            }
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });
    return verificationToken;

}