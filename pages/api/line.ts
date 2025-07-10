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
        altText: 'จองรอบ - คลิกเพื่อจองตอนนี้',
        contents: {
          type: 'bubble',
          size: 'kilo',
          header: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '🎯 จองรอบ',
                weight: 'bold',
                size: 'xl',
                color: '#ffffff',
                align: 'center'
              }
            ],
            backgroundColor: '#007bff',
            paddingAll: 'lg'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'พร้อมจองแล้ว!',
                weight: 'bold',
                size: 'lg',
                color: '#333333',
                align: 'center',
                margin: 'md'
              },
              {
                type: 'text',
                text: 'คลิกปุ่มด้านล่างเพื่อเริ่มการจอง',
                size: 'sm',
                color: '#666666',
                align: 'center',
                wrap: true,
                margin: 'sm'
              },
              {
                type: 'separator',
                margin: 'lg'
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '✨ รวดเร็ว ง่ายดาย',
                    size: 'sm',
                    color: '#666666',
                    margin: 'md'
                  },
                  {
                    type: 'text',
                    text: '📱 ใช้งานผ่านมือถือ',
                    size: 'sm',
                    color: '#666666',
                    margin: 'xs'
                  },
                  {
                    type: 'text',
                    text: '⏰ ตลอด 24 ชั่วโมง',
                    size: 'sm',
                    color: '#666666',
                    margin: 'xs'
                  }
                ],
                margin: 'lg'
              }
            ],
            paddingAll: 'lg'
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                style: 'primary',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: '🎫 จองตอนนี้เลย',
                  uri: 'https://reservation-station.vercel.app/'
                },
                color: '#28a745'
              },
              {
                type: 'spacer',
                size: 'sm'
              }
            ],
            paddingAll: 'lg'
          },
          styles: {
            header: {
              backgroundColor: '#007bff'
            },
            body: {
              backgroundColor: '#f8f9fa'
            },
            footer: {
              backgroundColor: '#ffffff'
            }
          }
        }
      });
    }

    // if (event?.type === 'message') {
    //   await lineClient.replyMessage(event.replyToken, {
    //     type: 'text',
    //     text: `Your userId is: ${event.source.userId}`
    //   });
    // }
    res.status(200).end();
  });
}