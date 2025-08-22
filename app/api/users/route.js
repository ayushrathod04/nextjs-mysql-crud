import { query } from "@/lib/db";

// CREATE user
export async function POST(req) {
  const { name, email } = await req.json();
  const result = await query({
    query: "INSERT INTO users (name, email) VALUES (?, ?)",
    values: [name, email],
  });
  return Response.json({ id: result.insertId, name, email });
}

// READ all users
export async function GET() {
  const users = await query({ query: "SELECT * FROM users" });
  return Response.json(users);
}
