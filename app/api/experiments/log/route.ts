import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Here we would save the result to the workspace storage
        // await saveExperimentResult(body);

        return NextResponse.json({ success: true, message: "Result logged" });
    } catch (e) {
        return NextResponse.json({ error: "Failed to log result" }, { status: 500 });
    }
}
