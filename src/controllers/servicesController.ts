import {ObjectId} from 'mongodb'; 
import {Request, Response} from 'express';
import { IUser, User } from '../models/userSchema';

export async function getUserAllController(_req: Request, res: Response)
{
    try{
    const user = await User.getUserAll();
    res.json(user);
    }catch(error)
    {
        res.status(480).json({status: 480, message: 'Fail in the search all user'})
    }
}

export async function getUserController(req: Request, res: Response){
    try{
        const user = await User.getUser(new ObjectId(req.params.id));
        res.json(user)
    }catch(error){
        res.status(400).json({status: 400, message: 'Verify the id, user not exist'})
    }
}

export async function createUserController(req:Request, res: Response){
    try{
        if (req.body.updatedAt || req.body.creatededAt || req.body.id) {
            return res.status(400).json({ msg: "It can not update this parameters" });
        }
        const user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({msg: 'The user already exists'})
        }
        const newUser = await User.createUser(req.body);
        res.json(newUser);
    }catch(error){
        res.status(400).json({status: 400, message: error})
    }
}

export async function deleteUserController(req:Request, res: Response){
    try{
        const user = await User.deletUser(new ObjectId(req.params.id));
        res.json(user);
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the delete to the user'})
    }
}


export const updateUserController = async (req:Request, res: Response) => {
    try{
        if (req.body.updatedAt || req.body.createdAt || req.body.id) {
            return res.status(400).json({ msg: "It can not update this parameters" });
        }
        const user = await User.findOne({id: req.userId});
        console.log(user)
        const update : IUser = await User.updatUser(req.body, user)
        res.json(update);
    }catch(error){
       res.status(400).json({status: 400, message: 'Fail in the update to the user'})
    }
}