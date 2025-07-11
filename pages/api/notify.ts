import type { NextApiRequest, NextApiResponse } from 'next';
import { lineClient } from '../../utils/line';

// TODO: Replace with your actual admin LINE userId
const ADMIN_USER_ID = 'Ubb98d54aff1fb808c5d2d300a40fbb6b';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nickname, date, time } = req.body;

  try {
    // Send message to admin
    await lineClient.pushMessage(ADMIN_USER_ID, {
      type: 'text',
      text: `New booking: ${nickname} - ${date} ${time}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send LINE message' });
  }
} 