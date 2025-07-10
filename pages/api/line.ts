import type { NextApiRequest, NextApiResponse } from 'next';
import { lineClient } from '../../utils/line';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    const event = JSON.parse(body).events?.[0];
    if (event?.type === 'message' && event.message.text.toLowerCase().includes('จอง')) {
      await lineClient.replyMessage(event.replyToken, {
        type: 'flex',
        altText: 'จองรอบเรียนมวย',
        contents: {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'จองรอบเรียนมวย',
                weight: 'bold',
                size: 'xl'
              },
              {
                type: 'button',
                style: 'primary',
                action: {
                  type: 'uri',
                  label: 'จองตอนนี้',
                  uri: '  https://boxing-station.vercel.app'
                }
              }
            ]
          }
        }
      });
    }
    res.status(200).end();
  });
}