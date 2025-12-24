// Server Component


import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getKBIndex, KBDoc } from '@/lib/kb-service';

// Check if we can use server components or need client side fetch
// mixing server logic imports in client component might fail if not careful.
// For simplicity in this demo environment, let's assume we fetch from API or mock.

// Since kb-service is server-side (fs), we can't import it directly in 'use client' easily without server actions.
// But as this is a prototype, let's create a server component page instead?
// Or mock the data for now if API route isn't ready. 
// Plan said: `api/kb/route.ts` optional.

// Let's make this a Server Component (remove 'use client')
// But wait, my previous pages were 'use client'.
// For safety/speed, I'll make it a Server Component to use `getKBIndex` directly.

import { getKBIndex as fetchKB } from '@/lib/kb-service';

export default async function KBPage() {
    const docs = await fetchKB();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between pb-6 border-b">
                <div>
                    <h1 className="text-3xl font-bold">Knowledge Base</h1>
                    <p className="text-gray-500">The "Brain" of the Scenario Librarian.</p>
                </div>
                <Button variant="outline">Refresh Index</Button>
            </div>

            <div className="grid gap-4">
                {docs.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 bg-gray-50 rounded border border-dashed">
                        No documents found. Check <code>/kb</code> directory.
                    </div>
                ) : (
                    docs.map((doc: any) => (
                        <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6 flex items-start justify-between">
                                <div>
                                    <div className="flex gap-2 items-center mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            {doc.type}
                                        </span>
                                        {doc.risk_level === 'high' && (
                                            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded">
                                                High Risk
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{doc.title}</h3>
                                    <p className="text-sm text-gray-500 font-mono">{doc.filepath}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {doc.tags?.map((tag: string) => (
                                            <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    Read &rarr;
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
