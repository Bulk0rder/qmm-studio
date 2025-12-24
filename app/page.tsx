import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function Home() {
    return (
        <div className="space-y-8">
            <section className="text-center py-12 space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Scenario Librarian <span className="text-blue-600">Studio</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Turn unclear business situations into validated strategies using the Quantum Marketing Model (JTBD × Lean × AIDA).
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Link href="/new">
                        <Button size="lg">Start New Scenario</Button>
                    </Link>
                    <Link href="/kb">
                        <Button variant="outline" size="lg">Browse Knowledge Base</Button>
                    </Link>
                </div>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Drafts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">No recent scenarios found.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">Log Experiment Result</Button>
                        <Button variant="ghost" className="w-full justify-start">Add Requirement Doc</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-green-700">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            KB Loaded (12 Docs)
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
