import { NextResponse } from 'next/server';
import { searchScenarios } from '@/lib/scenario-service';
import { searchKB } from '@/lib/kb-service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { query, industry, workspaceId } = body;

        // Parallel execution for speed
        const [scenarios, kbDocs] = await Promise.all([
            searchScenarios(query || "", industry || "General"), // workspaceId logic should be inside service if needed
            searchKB(query || "")
        ]);

        // Calculate simple confidence based on match count
        let confidence = "Low";
        if (scenarios.length > 0 && kbDocs.length > 0) confidence = "Med";
        if (scenarios.length > 2 && kbDocs.length > 1) confidence = "High";

        return NextResponse.json({
            scenarios: scenarios.slice(0, 5),
            kbDocs: kbDocs.slice(0, 3),
            confidence
        });
    } catch (error) {
        console.error("Retrieval API Error:", error);
        return NextResponse.json({ scenarios: [], kbDocs: [], confidence: "Low" }, { status: 500 });
    }
}
