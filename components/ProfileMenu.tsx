'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Moon, Sun, Monitor, Users } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { UI_COPY } from '@/lib/ui-copy';

interface ProfileMenuProps {
    displayName: string;
}

export function ProfileMenu({ displayName }: ProfileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeMenu();
        if (e.key === 'Enter' || e.key === ' ') toggleMenu(); // Basic toggle for the button
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                onKeyDown={handleKeyDown}
                className="flex items-center gap-3 py-1 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <div className="text-sm font-medium text-app text-right hidden md:block">
                    {displayName}
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold text-xs border border-blue-200 dark:border-blue-800">
                    {displayName.substring(0, 2).toUpperCase()}
                </div>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                    role="menu"
                >
                    <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs font-semibold text-muted tracking-wider uppercase">
                            {UI_COPY.PROFILE_MENU.LABEL(displayName)}
                        </p>
                    </div>

                    <div className="p-1">
                        <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-app rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" role="menuitem">
                            <User size={16} className="text-muted" />
                            {UI_COPY.PROFILE_MENU.ITEMS.PROFILE}
                        </button>
                        <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-app rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" role="menuitem">
                            <Users size={16} className="text-muted" />
                            Edit Profile
                        </button>
                        <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-app rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" role="menuitem">
                            <Settings size={16} className="text-muted" />
                            {UI_COPY.PROFILE_MENU.ITEMS.SETTINGS}
                        </button>
                    </div>

                    <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>

                    <div className="p-1">
                        <div className="px-3 py-1 text-xs text-muted mb-1 font-medium">{UI_COPY.PROFILE_MENU.ITEMS.APPEARANCE}</div>
                        <div className="grid grid-cols-3 gap-1 px-1">
                            <button
                                onClick={() => setTheme('light')}
                                className={`flex flex-col items-center justify-center py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${theme === 'light' ? 'bg-zinc-100 dark:bg-zinc-800 text-blue-600' : 'text-muted'}`}
                                title={UI_COPY.PROFILE_MENU.THEME.LIGHT}
                            >
                                <Sun size={16} />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`flex flex-col items-center justify-center py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${theme === 'dark' ? 'bg-zinc-100 dark:bg-zinc-800 text-blue-600' : 'text-muted'}`}
                                title={UI_COPY.PROFILE_MENU.THEME.DARK}
                            >
                                <Moon size={16} />
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`flex flex-col items-center justify-center py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${theme === 'system' ? 'bg-zinc-100 dark:bg-zinc-800 text-blue-600' : 'text-muted'}`}
                                title={UI_COPY.PROFILE_MENU.THEME.SYSTEM}
                            >
                                <Monitor size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>

                    <div className="p-1">
                        <a href="/logout" className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors" role="menuitem">
                            <LogOut size={16} />
                            {UI_COPY.PROFILE_MENU.ITEMS.LOGOUT}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
