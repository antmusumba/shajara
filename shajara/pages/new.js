// pages/new.js

import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

export default function NewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    router.push('/');
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Create New Note</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title:</label>
              <input
                type="text"
                id="title"
                className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content:</label>
              <textarea
                id="content"
                className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
              Create Note
            </button>
            <Link href="/" className="inline-block text-blue-500 underline hover:text-blue-700">
              ← Back to Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
