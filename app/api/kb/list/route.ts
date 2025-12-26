import { NextResponse } from 'next/server';
import { listDocs } from '@/lib/kb-service';

export async function GET() {
    const docs = await listDocs();
    return NextResponse.json(docs);
}
