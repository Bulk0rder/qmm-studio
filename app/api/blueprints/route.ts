
import { NextResponse } from 'next/server';
import { generateBlueprint } from '@/lib/blueprint-engine';
import { saveBlueprint } from '@/lib/storage';
import { UserScenarioInput } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const body: UserScenarioInput = await request.json();

        // Basic validation
        if (!body.industry || !body.objective) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const blueprint = await generateBlueprint(body);
        saveBlueprint(blueprint);
        const id = blueprint.id;

        return NextResponse.json({ id, blueprint }, { status: 201 });
    } catch (error) {
        console.error("Error generating blueprint:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
