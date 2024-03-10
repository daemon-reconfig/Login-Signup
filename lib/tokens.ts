import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getVerificationTokenE } from '@/data/verification-t';
import { getPasswordResetE } from '@/data/password-reset-t';
import { getTwoFactorE } from '@/data/two-factor-t';

export const generateTwoFactor = async (email: string) => {
    const token = crypto.randomInt(100000, 999999).toString();
    console.log("token", token);
    const expires = new Date(new Date().getTime() + 1000 * 3600);
    const ifExisted = await getTwoFactorE(email);
    if(ifExisted) {
        await db.twoFactorToken.delete({
            where: {
                id: ifExisted.id
            }
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        }
    });
    return twoFactorToken;
}

export const generatePasswordReset = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1000 * 3600);
    const ifExisted = await getPasswordResetE(email);

    if(ifExisted) {
        await db.passwordResetToken.delete({
            where: {
                id: ifExisted.id
            }
        });
    }

    const resetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        }
    });
    return resetToken;
}

export const generateTokens = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1000 * 3600);
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