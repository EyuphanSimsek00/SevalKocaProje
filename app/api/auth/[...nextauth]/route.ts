import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// @ts-ignore
import { connectToDB } from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@sevalkoca.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const pool = await connectToDB();
          
          // Veritabanından kullanıcıyı e-posta adresine göre getir
          const result = await pool.request()
            .input('email', credentials.email)
            .query(`SELECT * FROM Users WHERE Email = @email`);
            
          const user = result.recordset[0];
          
          // Kullanıcı yoksa
          if (!user) {
            return null;
          }
          
          // Şifre kontrolü: Veritabanındaki 'PasswordHash' ile kullanıcının girdiği şifreyi kıyasla
          const isPasswordValid = await bcrypt.compare(credentials.password, user.PasswordHash);
          
          if (!isPasswordValid) {
            return null;
          }
          
          const userId = user.ID || user.Id || user.id || "0";
          
          // Doğrulama başarılı
          return { 
            id: userId.toString(), 
            name: user.Name, 
            email: user.Email, 
            role: user.Role 
          };

        } catch (error) {
          // Veritabanı çökme vb durumlarda Next-Auth'un bloklanmasını engellemek için hatayı null döndürerek yakalıyoruz
          console.error("Giriş esnasında veritabanı hatası:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
