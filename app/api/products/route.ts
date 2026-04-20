import { NextResponse } from 'next/server';
// @ts-ignore
import { connectToDB } from '@/lib/db';

export async function GET() {
    try {
        const pool = await connectToDB();

        const result = await pool.request().query('SELECT * FROM Products');

        return NextResponse.json(result.recordset);
    } catch (error: any) {
        return NextResponse.json({ message: "Hata oluştu", error: error.toString() }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const pool = await connectToDB();
        
        await pool.request()
            .input('name', body.Name)
            .input('price', body.Price)
            .input('category', body.Category)
            .input('description', body.Description)
            .input('image', body.Image)
            .query(`INSERT INTO Products (Name, Price, Category, Description, Image) 
                    VALUES (@name, @price, @category, @description, @image)`);

        return NextResponse.json({ success: true, message: "Ürün başarıyla eklendi." });
    } catch (error: any) {
        return NextResponse.json({ message: "Ekleme hatası oluştu", error: error.toString() }, { status: 500 });
    }
}
