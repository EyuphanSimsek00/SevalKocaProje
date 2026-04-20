import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Aynı isimde dosya çakışmasını önlemek için benzersiz bir isim üretimi
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // public/uploads klasörü yoksa recursive olarak oluştur
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    return NextResponse.json({ error: "Yükleme sırasında hata oluştu.", details: error.toString() }, { status: 500 });
  }
}
