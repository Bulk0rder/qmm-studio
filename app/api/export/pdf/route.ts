import { NextResponse } from 'next/server';

function escapePdfText(value: string): string {
    return value
        .replace(/[^\x20-\x7E]/g, '-')
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');
}

function generateMinimalPDF(lines: string[]): string {
    const commands = lines.slice(0, 28).map((line, index) => {
        const y = index === 0 ? 730 : -22;
        const fontSize = index === 0 ? 18 : 10;
        return `${index === 0 ? 'BT' : ''} /F1 ${fontSize} Tf ${index === 0 ? 72 : 0} ${y} Td (${escapePdfText(line)}) Tj`;
    }).join('\n') + '\nET';

    const objects = [
        '<</Type /Catalog /Pages 2 0 R>>',
        '<</Type /Pages /Kids [3 0 R] /Count 1>>',
        '<</Type /Page /Parent 2 0 R /Resources << /Font <</F1 4 0 R>> >> /MediaBox [0 0 612 792] /Contents 5 0 R>>',
        '<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>',
        `<</Length ${commands.length}>> stream\n${commands}\nendstream`
    ];

    let body = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => {
        offsets.push(body.length);
        body += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xrefStart = body.length;
    body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach(offset => {
        body += `${String(offset).padStart(10, '0')} 00000 n \n`;
    });
    body += `trailer <</Size ${objects.length + 1} /Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF`;

    return body;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const title = searchParams.get('title') || 'QMM Blueprint';
    const confidence = searchParams.get('confidence') || 'Not supplied';
    const law = searchParams.get('law') || 'Law citation pending';

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const report = generateMinimalPDF([
        `QMM Blueprint Report: ${title}`,
        `Blueprint ID: ${id}`,
        `Confidence Score: ${confidence}`,
        `Governing Law: ${law}`,
        'Boardroom Summary:',
        'This export is designed for first-pass board sharing.',
        'For full visual detail, use the in-app Blueprint and Advisory views.',
        '',
        'QMM Studio: evidence-backed strategic diagnosis for trust-fragile markets.'
    ]);

    return new NextResponse(report, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="QMM-Blueprint-${id}.pdf"`
        }
    });
}
