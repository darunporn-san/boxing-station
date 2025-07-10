import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, date, time } = req.body;
    await connectDB();
    console.log('Booking:', { name, date, time });
    res.status(200).json({ message: `Booking confirmed for ${name} on ${date} at ${time}` });
  } else {
    res.status(405).end();
  }
}