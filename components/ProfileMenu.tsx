'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Moon, Sun, Monitor, Users, ChevronDown } from 'lucide-react';
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
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg pr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border border-black/5 dark:border-white/10 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">
                    {displayName.charAt(0).toUpperCase()}
                </div>
                <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (

                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg hover:shadow-xl transition-all p-1 z-50">
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
                        <div className="px-3 py-1 text-xs text-muted mb-1 font-medium">Workspace</div>
                        <button
                            onClick={() => {
                                if (confirm('Reset workspace data? Doing this preserves nothing.')) {
                                    localStorage.clear();
                                    window.location.reload();
                                }
                            }}
                            className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <Users size={16} />
                            Reset Workspace
                        </button>
                        <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
                            <Settings size={16} />
                            Settings
                        </button>
                    </div>

                    <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>

                    <div className="p-1">
                        <a href="/logout" className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors" role="menuitem">
                            <LogOut size={16} />
                            {UI_COPY.PROFILE_MENU.ITEMS.LOGOUT}
                        </a>
                    </div>
                </div>
            )
            }
        </div >
    );
}
