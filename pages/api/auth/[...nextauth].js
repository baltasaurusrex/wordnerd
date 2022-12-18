import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  getUserDetails,
  createGoogleAccount,
} from "../../../controllers/users.js";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn callback");
      console.log("user: ", user);
      // check if user already exists (based on email (user.email)), else create a new one using the email as the temporary username

      const userDetails = await getUserDetails(user.email);
      if (!userDetails) {
        const newUser = await createGoogleAccount(user);
      }

      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("jwt callback");
      console.log("callback > token: ", token);
      console.log("callback > account: ", account);
      if (account) {
        token.id = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session callback");
      session.user.id = token.id;
      return session;
    },
    async user() {
      console.log("user callback test");
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
