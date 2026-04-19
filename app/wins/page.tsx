'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { storage, STORAGE_KEYS, trackEvent } from '@/lib/storage-client';

export default function WinWallPage() {
    const [winners, setWinners] = useState<any[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get('data');
        if (encoded) {
            try {
                setWinners(JSON.parse(atob(encoded)));
                trackEvent('win_wall_viewed', { source: 'shared_url' });
                return;
            } catch {
                setWinners([]);
            }
        }
        setWinners(storage.get<any[]>(STORAGE_KEYS.KNOWN_WINNERS) || []);
        trackEvent('win_wall_viewed', { source: 'local_memory' });
    }, []);

    const shareUrl = useMemo(() => {
        if (typeof window === 'undefined') return '';
        const encoded = btoa(JSON.stringify(winners.slice(0, 12)));
        return `${window.location.origin}/wins?data=${encoded}`;
    }, [winners]);

    const copyShare = async () => {
        if (!shareUrl) return;
        await navigator.clipboard?.writeText(shareUrl);
        trackEvent('win_wall_shared', { winnerCount: winners.length });
        alert('Win Wall link copied. Share it with your team or on LinkedIn.');
    };

    return (
        <div className="min-h-[80vh] animate-in fade-in slide-in-from-bottom-4 space-y-8 py-6 duration-500">
            <header className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Win Wall</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">Known Winners worth repeating.</h1>
                <p className="mt-4 text-lg leading-relaxed text-[#A7A7BF]">
                    Every promoted result becomes proof that your market memory is compounding.
                </p>
                <Button onClick={copyShare} disabled={winners.length === 0} className="mt-6 bg-yellow-300 text-black hover:bg-yellow-200">
                    Share Win Wall
                </Button>
            </header>

            {winners.length === 0 ? (
                <div className="rounded-lg border border-dashed border-yellow-300/25 bg-yellow-300/5 p-10 text-center">
                    <Trophy className="mx-auto mb-4 text-yellow-300" size={42} />
                    <h2 className="text-xl font-bold text-white">No Known Winners yet.</h2>
                    <p className="mx-auto mt-2 max-w-lg text-sm text-[#A7A7BF]">
                        Log a winning experiment in The Lab and promote it to Memory. It will appear here as shareable proof.
                    </p>
                    <Link href="/lab">
                        <Button variant="outline" className="mt-5 border-yellow-300/30 text-white hover:bg-yellow-300/10">Open The Lab</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {winners.map((winner, index) => (
                        <article key={`${winner.id || winner.title}-${index}`} className="rounded-lg border border-yellow-300/25 bg-yellow-300/5 p-6">
                            <Trophy className="mb-4 text-yellow-300" size={24} />
                            <h2 className="text-xl font-bold text-white">{winner.title}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-[#CFCFE6]">{winner.hypothesis || winner.learning || 'Promoted as a repeatable market pattern.'}</p>
                            <div className="mt-5 rounded-md bg-black/25 p-3 text-sm font-bold text-yellow-200">{winner.outcomeMetric || winner.primary_metric || 'Outcome logged'}</div>
                        </article>
                    ))}
                </div>
            )}

            <Link href="/" className="fixed bottom-5 right-5 text-xs font-bold text-[#777791] hover:text-white">
                Powered by QMM Studio
            </Link>
        </div>
    );
}
