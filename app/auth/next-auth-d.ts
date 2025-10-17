import React from 'react'
import NextAuth, {DefaultSession} from 'next-auth'

declare module "next-auth" {
    interface Session {
        user:{
            id:string;
            role:"CUSTOMER" | "AGENT"| "ADMIN";
        } & DefaultSession["user"];
    }
    interface User{
        id:number
        role:"CUSTOMER"| "AGENT"| "ADMIN"
    }
    interface JWT{
        id:number
        role:"CUSTOMER"| "AGENT"| "ADMIN"
    }
}