import User, {IUser} from '../models/userSchema';
import {ObjectId} from 'mongodb'


export async function getUserAll(){
    try {
        return await User.find().select('-password');
    } catch (error) {
        console.log('The DB not has users')
    }
}

export async function getUser(id: ObjectId)
{
    try{
       return  await User.findOne({_id: id}).select('-password');
    }catch(error){
        console.log('Not exist the user, check out the document');
    }
}

export async function createUser(user:IUser){
    try{
        await user.save();
        return user;
    }catch(eror){
        console.log('Error in the creation of the user', eror)
    }
}

export async function deleteUser(id: ObjectId){
    try{
        return await User.findOneAndRemove({_id:id});

    }catch(error){
        console.log('It can not delete the user')
    }
}