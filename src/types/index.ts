import { NextFunction, Request, Response } from 'express';

export type ExpressFc = (req: Request, res: Response, next: NextFunction) => void;
