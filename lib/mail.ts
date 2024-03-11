import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const twoFactor = async (
    email: string,
    token: string,
) => {

    await resend.emails.send({
        from: "mail@santushtiservices.in",
        to: [email],
        subject: "Two Factor Authentication",
        html: `<p>Your two factor authentication code is: ${token}</p>` 
    })
}
export const sendPassword = async (
    email: string,
    token: string,
) => {
    const passwordLink = `https://login-signup-black-tau.vercel.app/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "mail@santushtiservices.in",
        to: [email],
        subject: "Reset Your Password",
        html: `<p>Click <a href="${passwordLink}">Here</a> to reset password.</p>`
    })


}
export const sendEmail = async (
    email: string,
    token: string,
) => {
    const confirmationLink = `https://login-signup-black-tau.vercel.app/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "mail@santushtiservices.in",
        to: [email],
        subject: "Confirm Your Email",
        html: `<p>Click <a href="${confirmationLink}">Here</a> to confirm email.</p>`
    })
}
