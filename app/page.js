"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  // Fetch users
  async function fetchUsers() {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  async function addUser(e) {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "" });
    fetchUsers();
  }

  // Update user
  async function updateUser(id) {
    const name = prompt("Enter new name");
    const email = prompt("Enter new email");
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    fetchUsers();
  }

  // Delete user
  async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      <form onSubmit={addUser} className="mb-4 flex gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id} className="flex justify-between mb-2">
            <span>{u.name} ({u.email})</span>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-2 rounded"
                onClick={() => updateUser(u.id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
