import {Request, Response} from 'express';
import {User} from '../models/userSchema';
import {createTocken} from '../config/token'

export const signIn = async (req: Request, res: Response): Promise<Response>=> {
    try{}catch(error){}
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: "Write your email and password" });
    }
    const users = await User.findOne({ email: req.body.email });
    if (!users) {
      return res.status(400).json({ msg: "The User does not exists" });
    }
    console.log('this is', req.body.password)
    const isMatch = await users.comprobePasswords(req.body.password);
    console.log(isMatch)
    if (isMatch) {
      return res.status(400).json({ token: createTocken(users) });
    }
    return res.status(400).json({
      msg: "The email or password are incorrect"
    });
} 