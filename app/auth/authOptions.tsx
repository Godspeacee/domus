import prisma from "@/prisma/clientfile";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Remove this line:
  session: { strategy: "jwt" },
  debug: true,
  pages: {
    error: "/api/auth/error", // optional custom error page for debugging
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.role = dbUser?.role ?? "CUSTOMER";
        token.email = dbUser?.email ?? user.email;
      } else if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: String(token.email) },
        });
        if (dbUser) token.role = dbUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as any) ?? "CUSTOMER";
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
  },
};

export default authOptions;
