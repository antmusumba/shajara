// pages/api/notes.js

import { addNote, getNotes } from '../../lib/notes';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    try {
      const newNote = await addNote({ title, content });
      res.status(201).json(newNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add note' });
    }
  } else if (req.method === 'GET') {
    try {
      const notes = await getNotes();
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get notes' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
