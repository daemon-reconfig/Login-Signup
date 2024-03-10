
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { apiAuth, DEFAULT_LOGIN_REDIRECT, publicRoutes, authRoutes } from "./routes";
import {auth} from "./auth";
export default auth((req) => {
    const { nextUrl } = req;
    const isLogged = !!req.auth;
    const isApiRoute = nextUrl.pathname.startsWith(apiAuth);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiRoute){
        return null;
    }

    if(isAuthRoute){
        if(isLogged){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if(!isPublicRoute && !isLogged){
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    
    return null;
    
})


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}