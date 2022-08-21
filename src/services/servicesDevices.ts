import Devices, {IDevice} from '../models/deviceSchema';
import {ObjectId} from 'mongodb'


export async function getDeviceAll(){
    try {
        return await Devices.find();
    } catch (error) {
        console.log('The DB not has devices')
    }
}

export async function getDevice(id: ObjectId)
{
    try{
       return  await Devices.findOne({_id: id});
    }catch(error){
        console.log('Not exist the device, check out the id');
    }
}

export async function createDevice(device:IDevice){
    try{
        await device.save();
        return device;
    }catch(eror){
        console.log('Error in the creation of the device', eror)
    }
}

export async function deleteDevice(id: ObjectId){
    try{
        return await Devices.findOneAndRemove({_id:id});

    }catch(error){
        console.log('It can not delete the device')
    }
}