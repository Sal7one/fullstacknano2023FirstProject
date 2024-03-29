import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const queryValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const query = req.query;
  const jsonErorr = { success: false, message: '' };

  if (query.filename != undefined) {
    const folderPath = path.resolve('assets');
    const fileList = await fs.readdir(folderPath);

    if (!fileList.includes(`${query.filename}.jpg`)) {
      jsonErorr.message = 'Image does not exist';
      res.status(400).json(jsonErorr);
      return;
    }
  } else {
    jsonErorr.message = 'Please send an Image name';
    res.status(400).json(jsonErorr);
    return;
  }

  const widthParam: string = req.query.width as string;
  const heightParam: string = req.query.height as string;
  const height: number = parseInt(heightParam);
  const width: number = parseInt(widthParam);

  if (!isAllDigits(heightParam) || height < 0) {
    jsonErorr.message = 'height is invalid';
    res.status(400).json(jsonErorr);
    return;
  }
  if (!isAllDigits(widthParam) || width < 0) {
    jsonErorr.message = 'width is invalid';
    res.status(400).json(jsonErorr);
    return;
  }

  next();
};

function isAllDigits(testString: string): boolean {
  return /^\d+$/.test(testString);
}

export default queryValidator;
