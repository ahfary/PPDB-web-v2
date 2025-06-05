// src/app/lib/cors.ts
export async function handleCors(req: Request) {
  const headers = new Headers();

  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Tangani preflight OPTIONS
  if (req.method === "OPTIONS") {
    return headers;
  }

  return headers;
}

