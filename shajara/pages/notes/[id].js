// pages/notes/[id].js

import { getNoteById } from '../../lib/notes';
import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const note = await getNoteById(id);

  if (!note) {
    return {
      props: {
        note: null,
      },
    };
  }

  return {
    props: {
      note,
    },
  };
}

export default function NotePage({ note }) {
  const router = useRouter();

  if (!note) return <p className="p-6">Note not found.</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{note.title}</h1>
          <p className="mt-4 text-gray-700">{note.content}</p>
          <Link href="/" className="inline-block mt-6 text-blue-500 underline hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
