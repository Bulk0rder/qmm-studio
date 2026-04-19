import { NextRequest, NextResponse } from 'next/server';
import { signSession, verifySession } from './crypto';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from './constants';

export interface SessionPayload {
    workspaceId: string;
    userId: string; // Currently same as workspaceId or 'admin'
    displayName: string;
    role: 'admin' | 'user' | 'guest';
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    return verifySession(sessionCookie.value);
}

// For API Routes - checks session or throws error
export async function requireSession(): Promise<SessionPayload> {
    const session = await getSession();
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function createSessionCookie(payload: SessionPayload) {
    const token = signSession(payload);
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
}

export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
