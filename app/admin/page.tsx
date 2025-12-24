'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, Label, Textarea } from '@/components/ui/Input';

export default function AdminPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">KB Admin</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Knowledge Doc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g. 12. Viral Loops Framework" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="type">Type</Label>
                            <select className="w-full h-10 border rounded px-3">
                                <option>Framework</option>
                                <option>Playbook</option>
                                <option>Scenario</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="risk">Risk Level</Label>
                            <select className="w-full h-10 border rounded px-3">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="content">Markdown Content</Label>
                        <Textarea className="h-64 font-mono text-sm" placeholder="# Header..." />
                    </div>

                    <Button className="w-full">Save to KB</Button>
                </CardContent>
            </Card>
        </div>
    );
}
