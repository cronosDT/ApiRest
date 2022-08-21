import {ObjectId} from 'mongodb'; 
import {Request, Response} from 'express';
import User from '../models/userSchema';
import * as services from '../services/servicesUsers'

export async function getUserAllController(_req: Request, res: Response)
{
    try{
    const user = await services.getUserAll();
    res.json(user);
    }catch(error)
    {
        res.status(480).json({status: 480, message: 'Fail in the search all user'})
    }
}



export async function getUserController(req: Request, res: Response){
    try{
        const {id} = req.params;
        const user = await services.getUser(new ObjectId(id));
        res.json(user)
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the search to the user'})
    }
}

export async function createUserController(req:Request, res: Response){
    try{
        if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({msg: 'Write your email or password'});    
    }
    const user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({msg: 'The user already exists'})
    }
    const newUser = new User(req.body);
        await services.createUser(newUser);
        res.json(`User ${newUser.id} was create successfully`);
    }catch(error){
        res.status(400).json({status: 400, message: error})
    }
}

export async function deleteUserController(req:Request, res: Response){
    try{
        const { id } = req.params;
        const user = await services.deleteUser(new ObjectId(id));
        res.json(`User ${user.id} was deleted successfully`);
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the delete to the user'})
    }
}

export const updateUserController = async (req:Request, res: Response) => {
    try{
        const user = await User.findById({_id: req.userId}) 
        if(req.body.name) user.set('name', req.body.name)
        if(req.body.lasName) user.set('lasName', req.body.lastName)
        if(req.body.email) user.set('email', req.body.email)
        if(req.body.phone) user.set('phone', req.body.phone)
        if(req.body.password) user.set('password', req.body.password)
        await user.save();
        res.json(`User ${user.id} was updated successfully`);
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the update to the user'})
    }
}