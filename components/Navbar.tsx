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
    session?: {
        displayName: string;
        role: string;
    } | null;
}

export function Navbar({ session }: NavbarProps) {
    const pathname = usePathname();
    const userSession = session || { displayName: 'Guest', role: 'guest' };

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 transition-all">
            <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">

                {/* LEFT: Branding & Navigation */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-semibold text-lg tracking-tight text-app flex items-center gap-2 hover:opacity-80 transition-opacity">
                        {/* Atom Icon */}
                        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center relative">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full absolute"></div>
                        </div>
                        <span className="hidden sm:inline">{UI_COPY.APP.NAME}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-1 items-center">
                        <NavLink href="/new" active={isActive('/new')}>{UI_COPY.NAV.NEW_SCENARIO}</NavLink>
                        <NavLink href="/library" active={isActive('/library')}>{UI_COPY.NAV.SCENARIO_LIBRARY}</NavLink>
                        <NavLink href="/experiments" active={isActive('/experiments')}>{UI_COPY.NAV.EXPERIMENTS}</NavLink>
                        <NavLink href="/kb" active={isActive('/kb')}>{UI_COPY.NAV.KNOWLEDGE_BASE}</NavLink>
                        <NavLink href="/advisory" active={isActive('/advisory')}>Advisory</NavLink>
                        <AboutDropdown isActive={isActive('/about')} />
                    </div>
                </div>

                {/* RIGHT: Profile */}
                <div className="flex items-center gap-4 pl-4">
                    <ProfileMenu displayName={userSession.displayName} />
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

function AboutDropdown({ isActive }: { isActive: boolean }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-3 py-1.5 flex items-center gap-1 rounded-full text-sm font-medium transition-all ${isActive || isOpen ? 'text-app bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-black/5' : 'text-muted hover:text-app hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
                {UI_COPY.NAV.ABOUT}
                <ChevronDown size={12} className={`opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-[calc(100%+0.5rem)] left-0 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 z-50">
                    <div className="py-1">
                        <Link href="/about/how-to-use" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm">{UI_COPY.NAV.HOW_TO_USE}</Link>
                        <Link href="/about/usefulness" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm">{UI_COPY.NAV.USEFULNESS}</Link>
                        <div className="h-px bg-border my-1" />
                        <Link href="/privacy" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm text-muted-foreground">{UI_COPY.NAV.PRIVACY}</Link>
                        <Link href="/terms" onClick={() => setIsOpen(false)} className="block px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm text-muted-foreground">{UI_COPY.NAV.TERMS}</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
