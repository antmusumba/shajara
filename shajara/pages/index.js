// pages/index.js

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
    }

    loadNotes();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-violet-100 min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-violet-700 tracking-tight">My Notes</h1>
          <Link
            href="/new"
            className="hidden md:inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
          >
            + New Note
          </Link>
        </div>
      </header>
      {/* Notes List */}
      <main className="max-w-3xl mx-auto pt-8 pb-20 px-6">
        {notes && notes.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {notes.map((note) => (
              <li
                key={note.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-slate-100 group"
              >
                <Link
                  href={`/notes/${note.id}`}
                  className="block"
                >
                  <h2 className="text-lg font-semibold text-violet-800 group-hover:underline mb-2 truncate">
                    {note.title}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-2">{note.content || 'No content'}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-slate-400 mt-16">
            <p>No notes yet. Click the button below to create your first note!</p>
          </div>
        )}
        {/* Floating Action Button */}
        <Link
          href="/new"
          className="fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl md:hidden"
          aria-label="Create New Note"
        >
          +
        </Link>
      </main>
    </div>
  );
}