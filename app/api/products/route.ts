
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
