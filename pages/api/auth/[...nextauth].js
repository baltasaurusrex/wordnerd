import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("callback > token: ", token);
      console.log("callback > account: ", account);
      return token;
    },
    async session({ session, token, user }) {
      console.log("callback > session: ", session);
      console.log("callback > token: ", token);
      console.log("callback > user: ", user);
      return session;
    },
  },
});
