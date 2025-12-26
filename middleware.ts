import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from './lib/constants';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public paths
    if (pathname.startsWith('/login') || pathname.startsWith('/_next') || pathname.startsWith('/static')) {
        return NextResponse.next();
    }

    const cookie = request.cookies.get(SESSION_COOKIE_NAME);

    if (!cookie?.value) {
        // No session
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // We strictly avoid using 'crypto' or verification here to ensure Edge Runtime compatibility.
    // The Server Components (Layout, Page) will validate the session integrity using the Node.js runtime.
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
