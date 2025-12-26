import { NextResponse } from 'next/server';
import { getKBDoc } from '@/lib/kb-service';

export async function GET(request: Request, { params }: { params: { docId: string } }) {
    const doc = await getKBDoc(params.docId);

    if (!doc) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(doc);
}
