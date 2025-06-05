import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // contoh

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // opsi lainnya
});

export { handler as GET, handler as POST };
