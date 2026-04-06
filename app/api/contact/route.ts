import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json() as any;
    const { name, email, company, department, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Connect to DB binding
    let DB: any;
    try {
      DB = (getRequestContext().env as any).DB;
    } catch (e) {
      console.warn("Database not bound explicitly via NextOnPages. Running in local dev or DB not configured.");
    }

    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();
    const submitter_ip = request.headers.get('x-forwarded-for') || 'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Map fields
    const nameParts = name.trim().split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'N/A';

    let category = 'general';
    const dpt = (department || '').toLowerCase();
    if (dpt.includes('enterprise')) category = 'enterprise';
    else if (dpt.includes('partner')) category = 'partnership';
    else if (dpt.includes('support')) category = 'support';
    else if (dpt.includes('press')) category = 'press';

    console.log('Contact submission processing:', { id, name, email, company, department, message });

    if (DB) {
      await DB.prepare(
        `INSERT INTO contact_submissions 
         (id, first_name, last_name, email, company, category, message, submitter_ip, user_agent, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id, first_name, last_name, email, company || null, category, message, submitter_ip, user_agent, created_at, created_at
      ).run();
    } else {
      console.log('Skipped DB Insertion due to missing DB binding.');
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Contact form DB error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}