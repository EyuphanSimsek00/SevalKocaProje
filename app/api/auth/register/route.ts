import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// @ts-ignore
import { connectToDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Lütfen tüm alanları doldurun." }, { status: 400 });
    }

    const pool = await connectToDB();

    // Email'in kullanımda olup olmadığını kontrol et
    const checkUser = await pool.request()
      .input('email', email)
      .query(`SELECT * FROM Users WHERE Email = @email`);

    if (checkUser.recordset.length > 0) {
      return NextResponse.json({ message: "Bu email zaten kayıtlı." }, { status: 400 });
    }

    // Şifreyi bcrypt kullanarak hashle (salt-rounds=10 standardı ile)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı Users tablosuna güvenli bir şekilde kaydet (SQL injection'a karşı input metodu ile)
    await pool.request()
      .input('name', name)
      .input('email', email)
      .input('passwordHash', hashedPassword)
      .input('role', 'user') // Default olarak user yetkisiyle oluştur
      .query(`INSERT INTO Users (Name, Email, PasswordHash, Role) VALUES (@name, @email, @passwordHash, @role)`);

    return NextResponse.json({ success: true, message: "Kayıt işlemi başarılı." }, { status: 201 });
  } catch (error: any) {
    console.error("Kayıt Hatası:", error);

    let errorMessage = "Kayıt olurken bilinmeyen bir hata oluştu. Veritabanı bağlantısı kopmuş olabilir.";
    
    if (error.name === 'ConnectionError' || error.code === 'ELOGIN') {
      errorMessage = "Veritabanı bağlantı hatası yaşandı. Lütfen daha sonra tekrar deneyin.";
    }

    return NextResponse.json({ 
        message: errorMessage, 
        error: process.env.NODE_ENV === "development" ? error.toString() : null 
    }, { status: 500 });
  }
}
