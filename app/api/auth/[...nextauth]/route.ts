import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        console.log(
          "in here bro//////////////////////////////",
          credentials.email
        );
        const user = await prisma.user.findUnique({
          where: {
            Email: credentials.email,
          },
        });

        if (!user || !user.PasswordHash) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.PasswordHash
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.UserId,
          email: user.Email,
          name: `${user.FirstName} ${user.LastName}`,
          role: user.Role,
          test: "testinggg",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          console.log("im in here");
          const dbUser = await prisma.user.findUnique({
            where: { Email: user.email! },
          });
          return {
            ...token,
            role: dbUser?.Role || "user",
            id: dbUser?.UserId || user.id,
          };
        }
        return {
          ...token,
          role: user.role,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.id,
        },
      };
    },
    async signIn({ user }) {
      try {
        console.log("User user:", user);
        const userExist = await prisma.user.findUnique({
          where: { Email: user.email! },
        });

        if (!userExist) {
          console.log("User not found, creating a new one.");
          await prisma.user.create({
            data: {
              Email: user.email!,
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error in sign-in callback:", error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
