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
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
        
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: { id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}){
            if (account?.provider !== "credentials") {
                return true;
            }
            if (!user.id) return false;
            const existUser = await getUserbyId(user.id);
            // preventing sign in without verification
            if(!existUser?.emailVerified) return false;
            
            return true;
        },
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