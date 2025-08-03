import { NextRequest } from 'next/server';
import { buffer } from 'micro';

// Helper to parse raw body because Next.js App Router doesn't have direct bodyParser option
export async function getRawBody(request: NextRequest | Request): Promise<string> {
  if (request instanceof NextRequest) {
    const clonedRequest = request.clone();
    return await clonedRequest.text();
  } else {
    return await request.text();
  }
}

// Alternative using buffer if needed
export async function getBufferedBody(request: NextRequest | Request): Promise<Buffer> {
  const body = await getRawBody(request);
  return Buffer.from(body);
} 