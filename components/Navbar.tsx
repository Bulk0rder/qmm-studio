'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProfileMenu } from './ProfileMenu';
import { UI_COPY } from '@/lib/ui-copy';
import { ChevronDown } from 'lucide-react';
import { SessionPayload } from '@/lib/auth'; // Ensure this uses a type we can import, or redefine payload type here if auth is server-only.
// Actually lib/auth might pull in Node.js stuff. Let's just define the prop type cleanly.

interface NavbarProps {
    session: {
        displayName: string;
        role: string;
    } | null;
}

export function Navbar({ session }: NavbarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    if (!session) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-app h-16 transition-all">
            <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">

                {/* LEFT: Navigation Links */}
                <div className="flex gap-1 items-center overflow-x-auto no-scrollbar mask-gradient-right md:mask-none">
                    <div className="flex gap-1 items-center bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-full border border-black/5 dark:border-white/5">
                        <NavLink href="/new" active={isActive('/new')}>{UI_COPY.NAV.NEW_SCENARIO}</NavLink>
                        <NavLink href="/library" active={isActive('/library')}>{UI_COPY.NAV.SCENARIO_LIBRARY}</NavLink>
                        <NavLink href="/experiments" active={isActive('/experiments')}>{UI_COPY.NAV.EXPERIMENTS}</NavLink>
                        <NavLink href="/kb" active={isActive('/kb')}>{UI_COPY.NAV.KNOWLEDGE_BASE}</NavLink>

                        <div
                            className="relative group px-3 py-1.5 text-sm font-medium text-muted hover:text-app cursor-pointer flex items-center gap-1 transition-colors"
                        >
                            <span className="flex items-center gap-1">{UI_COPY.NAV.ABOUT} <ChevronDown size={12} className="opacity-50 group-hover:rotate-180 transition-transform" /></span>

                            {/* Improved Dropdown Bridge */}
                            <div className="absolute top-full left-0 w-full h-4 bg-transparent z-50"></div>

                            <div className="absolute top-[calc(100%+0.5rem)] left-0 mt-0 w-40 bg-white dark:bg-zinc-900 border border-app rounded-xl shadow-xl overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all origin-top-left z-50">
                                <Link href="/about/how-to-use" className="block px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm whitespace-nowrap">{UI_COPY.NAV.HOW_TO_USE}</Link>
                                <Link href="/about/usefulness" className="block px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm whitespace-nowrap">{UI_COPY.NAV.USEFULNESS}</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Brand + Profile */}
                <div className="flex items-center gap-4 pl-4">
                    <Link href="/" className="font-semibold text-lg tracking-tight text-app flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-6 h-6 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg shadow-sm"></div>
                        <span className="hidden sm:inline">{UI_COPY.APP.NAME}</span>
                        {session.role === 'guest' && <span className="text-[10px] bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">Guest</span>}
                    </Link>

                    <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

                    <ProfileMenu displayName={session.displayName} />
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children, active }: { href: string, children: React.ReactNode, active: boolean }) {
    return (
        <Link
            href={href}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${active ? 'bg-white dark:bg-zinc-800 text-app shadow-sm ring-1 ring-black/5' : 'text-muted hover:text-app hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
            {children}
        </Link>
    )
}
