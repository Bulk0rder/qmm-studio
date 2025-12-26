import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
    await clearSessionCookie();
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
}
