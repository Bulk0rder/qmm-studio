'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Input, Label } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { AlertCircle, ArrowRight, Loader2, UserPlus, Users } from 'lucide-react';
import { UI_COPY } from '@/lib/ui-copy';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { TITLE, SUBTITLE, CONTINUE_EMAIL, CONTINUE_GOOGLE, GUEST_MODE, GUEST_NOTE, ONBOARDING } = UI_COPY.LOGIN;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const workspaceName = formData.get('workspaceName');
        const pin = formData.get('pin');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'login',
                    workspaceName,
                    pin
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Login failed');
            }

            // Success
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const workspaceName = formData.get('workspaceName');
        const displayName = formData.get('displayName');
        const pin = formData.get('pin');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'create',
                    workspaceName,
                    displayName,
                    pin
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Creation failed');
            }

            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuest = async () => {
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode: 'guest' })
            });

            if (!res.ok) throw new Error('Guest login failed');

            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-app">{TITLE}</h1>
                    <p className="text-muted">{SUBTITLE}</p>
                </div>

                <Card className="bg-white dark:bg-black border-app shadow-sm">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-zinc-100 dark:bg-zinc-900 m-2 rounded-lg p-1 w-[calc(100%-1rem)]">
                            <TabsTrigger value="login" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-app text-muted transition-all">Login</TabsTrigger>
                            <TabsTrigger value="create" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-app text-muted transition-all">New Workspace</TabsTrigger>
                        </TabsList>

                        <div className="px-6 pb-2">
                            {error && (
                                <div className="mb-4 p-3 rounded bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}
                        </div>

                        <TabsContent value="login">
                            <form onSubmit={handleLogin}>
                                <CardContent className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-ws" className="text-app">Workspace Name</Label>
                                        <Input id="login-ws" name="workspaceName" required placeholder="e.g. AcmeCorp" className="bg-transparent border-app text-app" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="login-pin" className="text-app">PIN Code</Label>
                                        <Input id="login-pin" name="pin" type="password" required pattern="[0-9]*" inputMode="numeric" placeholder="****" className="bg-transparent border-app text-app" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-3 pt-0">
                                    <Button type="submit" disabled={isLoading} className="w-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity rounded-xl">
                                        {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <ArrowRight className="mr-2" size={16} />}
                                        Enter Workspace
                                    </Button>
                                </CardFooter>
                            </form>
                        </TabsContent>

                        <TabsContent value="create">
                            <form onSubmit={handleCreate}>
                                <CardContent className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="create-ws" className="text-app">Workspace Name</Label>
                                        <Input id="create-ws" name="workspaceName" required placeholder="Unique ID (no spaces)" pattern="[a-zA-Z0-9-_]+" className="bg-transparent border-app text-app" />
                                        <p className="text-xs text-muted">This will be your login ID. No spaces.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="create-name" className="text-app">Display Name</Label>
                                        <Input id="create-name" name="displayName" required placeholder="User Name" className="bg-transparent border-app text-app" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="create-pin" className="text-app">Set PIN Code</Label>
                                        <Input id="create-pin" name="pin" type="password" required pattern="[0-9]{4,}" title="At least 4 digits" placeholder="4+ digits" className="bg-transparent border-app text-app" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                                        {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : <UserPlus className="mr-2" size={16} />}
                                        Create & Enter
                                    </Button>
                                </CardFooter>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="px-6 pb-6 pt-2">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-app" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-black px-2 text-muted">Or continue</span>
                            </div>
                        </div>
                        <Button variant="outline" type="button" onClick={handleGuest} disabled={isLoading} className="w-full border-app text-app hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl">
                            <Users className="mr-2" size={14} />
                            {GUEST_MODE}
                        </Button>
                        <p className="text-center text-xs text-muted mt-3">{GUEST_NOTE}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
