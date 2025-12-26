'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from './Button';

export function BackButton({ className = '' }: { className?: string }) {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className={`flex items-center gap-1 pl-0 text-muted hover:text-app mb-6 hover:bg-transparent ${className}`}
        >
            <ChevronLeft size={16} />
            Back
        </Button>
    );
}
