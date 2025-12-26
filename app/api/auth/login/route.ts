import { NextRequest, NextResponse } from 'next/server';
import { hashPin, verifyPin } from '@/lib/crypto';
import { createSessionCookie } from '@/lib/auth';
import { getUser, saveUser, getWorkspacePath, UserRecord, GUEST_WORKSPACE_ID, saveSettings } from '@/lib/storage';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { workspaceName, pin, displayName, mode } = body;

        console.log(`Login attempt: mode=${mode}, workspace=${workspaceName}`);

        if (mode === 'guest') {
            const guestId = `guest-${randomUUID().substring(0, 8)}`;
            console.log(`Creating guest session: ${guestId}`);

            // Initialize workspace
            getWorkspacePath(guestId);
            saveSettings({
                workspace_id: guestId,
                display_name: 'Guest User',
                theme_preference: 'system',
                defaults: { market: 'Global', industry: 'General', currency: 'USD' }
            }, guestId);

            await createSessionCookie({
                workspaceId: guestId,
                userId: guestId,
                displayName: 'Guest',
                role: 'guest'
            });

            return NextResponse.json({ success: true, workspaceId: guestId });
        }

        if (mode === 'create') {
            if (!workspaceName || !pin || !displayName) {
                return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
            }

            // Check if exists
            const existing = getUser(workspaceName);
            if (existing) {
                return NextResponse.json({ error: 'Workspace name taken' }, { status: 409 });
            }

            const workspaceId = randomUUID();
            const pinHash = await hashPin(pin);

            const newUser: UserRecord = {
                id: workspaceId,
                workspaceName,
                pinHash,
                displayName,
                createdAt: new Date().toISOString()
            };

            saveUser(newUser);

            // Initialize workspace folder
            getWorkspacePath(workspaceId);
            saveSettings({
                workspace_id: workspaceId,
                display_name: displayName,
                theme_preference: 'system',
                defaults: { market: 'Global', industry: 'General', currency: 'USD' }
            }, workspaceId);

            await createSessionCookie({
                workspaceId,
                userId: workspaceId,
                displayName,
                role: 'admin'
            });

            return NextResponse.json({ success: true, workspaceId });
        }

        if (mode === 'login') {
            if (!workspaceName || !pin) {
                return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
            }

            const user = getUser(workspaceName);
            if (!user) {
                return NextResponse.json({ error: 'Invalid workspace or PIN' }, { status: 401 });
            }

            const isValid = await verifyPin(pin, user.pinHash);
            if (!isValid) {
                return NextResponse.json({ error: 'Invalid workspace or PIN' }, { status: 401 });
            }

            await createSessionCookie({
                workspaceId: user.id,
                userId: user.id,
                displayName: user.displayName,
                role: 'admin'
            });

            return NextResponse.json({ success: true, workspaceId: user.id });
        }

        return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
