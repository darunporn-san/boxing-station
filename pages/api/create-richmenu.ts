import type { NextApiRequest, NextApiResponse } from 'next';
import { lineClient } from '../../utils/line';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // สร้าง richmenu object
    const richMenu = {
      size: { width: 2500, height: 843 },
      selected: true,
      name: 'Reservation Menu',
      chatBarText: 'เมนูจอง',
      areas: [
        {
          bounds: { x: 0, y: 0, width: 2500, height: 843 },
          action: {
            type: 'uri' as const,
            label: 'จองเลย',
            uri: 'https://reservation-station.vercel.app/'
          }
        }
      ]
    };

    // เรียก LINE API เพื่อสร้าง richmenu
    const richMenuId = await lineClient.createRichMenu(richMenu);

    // หมายเหตุ: ถ้ามีรูปภาพ สามารถอัปโหลดได้ด้วย lineClient.setRichMenuImage(richMenuId, ...)
    // แต่กรณีนี้ไม่มีรูป จะข้ามขั้นตอนนี้

    // ตั้ง richmenu เป็นค่า default ให้ user ทุกคน (optional)
    // await lineClient.setDefaultRichMenu(richMenuId);

    return res.status(200).json({ richMenuId });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Error creating richmenu' });
  }
} 