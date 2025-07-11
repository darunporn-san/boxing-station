import { lineClient } from './line';
import fs from 'fs';
import path from 'path';

export interface RichMenuArea {
  bounds: { x: number; y: number; width: number; height: number };
  action: { type: 'uri'; label: string; uri: string };
}

/**
 * สร้าง Rich Menu และอัปโหลดรูปภาพ
 */
export async function createAndSetDefaultRichMenu(
  areas: RichMenuArea[],
  imageFileName: string = 'richmenu.png'
): Promise<string> {
  // 1. สร้าง Rich Menu
  const richMenu = {
    size: { width: 2500, height: 843 },
    selected: true,
    name: 'Reservation Menu',
    chatBarText: 'เมนูจอง',
    areas,
  };

  const richMenuId = await lineClient.createRichMenu(richMenu);

  // 2. อัปโหลดรูปภาพ
  const imagePath = path.join(process.cwd(), 'public', imageFileName);
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Rich menu image not found at public/${imageFileName}`);
  }
  const imageStream = fs.createReadStream(imagePath);
  await lineClient.setRichMenuImage(richMenuId, imageStream, 'image/png');

  // 3. ตั้งเป็น default
  await lineClient.setDefaultRichMenu(richMenuId);

  return richMenuId;
} 