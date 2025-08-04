import { NextRequest } from 'next/server';

// Helper to parse raw body because Next.js App Router doesn't have direct bodyParser option
export async function getRawBody(request: NextRequest | Request): Promise<string> {
  if (request instanceof NextRequest) {
    const clonedRequest = request.clone();
    return await clonedRequest.text();
  } else {
    return await request.text();
  }
}

// Helper to get buffer from request body
export async function getBufferedBody(request: NextRequest | Request): Promise<Buffer> {
  const body = await getRawBody(request);
  return Buffer.from(body);
} 