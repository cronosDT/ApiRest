import config from './config'
import jwt from 'jsonwebtoken'
import {IUser} from '../models/userSchema';

export function createTocken (user: IUser){
    return jwt.sign({id: user.id, email: user.email }, config.jwtSecret)
    expiresIn: 86400;
}


