import config from "../config/config";
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

interface IPayload{
    id: string;
    email: string;
    iat: number;
}

export const  decodeTocken = (req: Request, res: Response, next: NextFunction) =>{
      try {
        const token = req.header('Authorization');
        if(!token) return res.status(403).json({msg: 'Invalid token'})     
        
        const payload = jwt.verify(token, config.jwtSecret) as IPayload
        req.userId = payload.id
        
        next();
      } catch (error) {
        console.log(error)
      }  
        
}
