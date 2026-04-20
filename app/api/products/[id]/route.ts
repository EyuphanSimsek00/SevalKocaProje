import { NextResponse } from 'next/server';
// @ts-ignore
import { connectToDB } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const pool = await connectToDB();

        await pool.request()
            .input('id', id)
            .query('DELETE FROM Products WHERE ID = @id');

        return NextResponse.json({ success: true, message: "Ürün başarıyla silindi." });
    } catch (error: any) {
        return NextResponse.json({ message: "Silme işlemi sırasında hata oluştu", error: error.toString() }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await req.json();
        const pool = await connectToDB();

        await pool.request()
            .input('id', id)
            .input('name', body.Name)
            .input('price', body.Price)
            .input('category', body.Category)
            .input('description', body.Description)
            .input('image', body.Image)
            .query(`
                UPDATE Products 
                SET Name = @name, Price = @price, Category = @category, Description = @description, Image = @image 
                WHERE ID = @id
            `);

        return NextResponse.json({ success: true, message: "Ürün başarıyla güncellendi." });
    } catch (error: any) {
        return NextResponse.json({ message: "Güncelleme sırasında hata oluştu", error: error.toString() }, { status: 500 });
    }
}
