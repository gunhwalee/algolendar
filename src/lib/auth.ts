import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";
import { NextAuthOptions } from "next-auth";
import { OAUTH } from "@/config/CONFIG";

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: OAUTH.CLIENT_ID || "",
      clientSecret: OAUTH.CLIENT_SECRET || "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        let userId = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!userId) {
          const newUser = { id: user.id, name: user.name!, email: user.email! };
          userId = await prisma.user.create({
            data: newUser,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.id = token.sub!;
      }

      return session;
    },
  },
};
