import { promises as fs } from 'fs';

async function imageFetcher(imageName: string): Promise<Buffer> {
  const imagePath = __dirname + '\\modified\\' + imageName;
  const imageBitmap = await fs.readFile(imagePath);
  return imageBitmap;
}

export default imageFetcher;
