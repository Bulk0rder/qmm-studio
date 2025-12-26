import { scrypt, randomBytes, createHmac, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const SESSION_SECRET = process.env.QMM_SESSION_SECRET || 'default-insecure-secret-change-me';

export async function hashPin(pin: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const buffer = (await scryptAsync(pin, salt, 64)) as Buffer;
    return `${salt}:${buffer.toString('hex')}`;
}

export async function verifyPin(pin: string, storedHash: string): Promise<boolean> {
    const [salt, originalHash] = storedHash.split(':');
    const buffer = (await scryptAsync(pin, salt, 64)) as Buffer;
    return timingSafeEqual(Buffer.from(originalHash, 'hex'), buffer);
}

export function signSession(payload: any): string {
    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = createHmac('sha256', SESSION_SECRET).update(data).digest('base64');
    // URL safe replacement
    const safeSignature = signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `${data}.${safeSignature}`;
}

export function verifySession(token: string): any | null {
    try {
        const [data, signature] = token.split('.');
        if (!data || !signature) return null;

        const expectedSignature = createHmac('sha256', SESSION_SECRET).update(data).digest('base64');
        const safeExpected = expectedSignature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        if (safeExpected !== signature) return null;

        return JSON.parse(Buffer.from(data, 'base64').toString());
    } catch (e) {
        return null;
    }
}
