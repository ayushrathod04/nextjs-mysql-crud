import { query } from "@/lib/db";

// UPDATE user
export async function PUT(req, { params }) {
  const { id } = params;
  const { name, email } = await req.json();
  await query({
    query: "UPDATE users SET name=?, email=? WHERE id=?",
    values: [name, email, id],
  });
  return Response.json({ id, name, email });
}

// DELETE user
export async function DELETE(req, { params }) {
  const { id } = params;
  await query({
    query: "DELETE FROM users WHERE id=?",
    values: [id],
  });
  return Response.json({ message: "User deleted" });
}
