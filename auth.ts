import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "./lib/db"
import { getUserbyId } from "./data/user"
import authConfig from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    callbacks: {
        async session({session, token}){
            
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            if(token.role && session.user){
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const existUser = await getUserbyId(token.sub);
            if(!existUser) return token;
            token.role = existUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
  ...authConfig,
})