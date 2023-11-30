import { NextFunction, Request, Response } from 'express';
import { X_API_KEY } from '@config';

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apikey = req.headers['x-api-key'];
  if (apikey && isValidateApiKey(apikey)) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
};

const isValidateApiKey = (apikey: string) => {
  return apikey === X_API_KEY;
};
