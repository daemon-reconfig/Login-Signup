import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { LoginSchema } from "@/schemas"
import type { NextAuthConfig } from "next-auth"
import { getUser } from "./data/user";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
        async authorize(credentials) {
            const validated = LoginSchema.safeParse(credentials);
            if(validated.success) {

                const {email, password} = validated.data;
                const user = await getUser(email);
                if(!user || !user.password) {
                    console.log("User not found");
                    return null;
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if(passwordMatch) {
                    console.log(user);
                    return user;
                }
            }
            return null;
        }
    })
  ],
} satisfies NextAuthConfig