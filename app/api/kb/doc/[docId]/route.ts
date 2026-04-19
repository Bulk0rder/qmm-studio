import { NextResponse } from 'next/server';
import { getKBDoc } from '@/lib/kb-service';

export async function GET(request: Request, { params }: { params: Promise<{ docId: string }> }) {
    const { docId } = await params;
    const doc = await getKBDoc(docId);

    if (!doc) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(doc);
}
