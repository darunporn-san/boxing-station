import type { NextApiRequest, NextApiResponse } from 'next';
import { createAndSetDefaultRichMenu, RichMenuArea } from '../../utils/lineRichMenu';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // กำหนดปุ่ม 2 ฝั่ง
    const areas: RichMenuArea[] = [
      {
        bounds: { x: 0, y: 0, width: 1250, height: 843 },
        action: {
          type: 'uri',
          label: 'จองคิว',
          uri: 'https://reservation-station.vercel.app/'
        }
      },
      {
        bounds: { x: 1250, y: 0, width: 1250, height: 843 },
        action: {
          type: 'uri',
          label: 'ดูตาราง',
          uri: 'https://www.ofm.co.th/'
        }
      }
    ];

    const richMenuId = await createAndSetDefaultRichMenu(areas, 'richmenu.png');
    return res.status(200).json({ richMenuId });
  } catch (error: any) {
    console.error('LINE API error:', error?.originalError?.response?.data || error);
    return res.status(500).json({
      message: error.message || 'Error creating richmenu',
      details: error?.originalError?.response?.data || error
    });
  }
} 