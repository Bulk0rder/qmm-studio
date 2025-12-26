import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = getSession();

    if (!session) {
        return NextResponse.json({ isAuthenticated: false }, { status: 200 });
    }

    return NextResponse.json({
        isAuthenticated: true,
        workspaceId: session.workspaceId,
        displayName: session.displayName,
        role: session.role
    });
}
