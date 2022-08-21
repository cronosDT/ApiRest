import {ObjectId} from 'mongodb'; 
import {Request, Response} from 'express';
import Devices from '../models/deviceSchema';
import * as services from '../services/servicesDevices'

export async function getDeviceAllController(_req: Request, res: Response)
{
    try{
    const device = await services.getDeviceAll();
    res.json(device);
    }catch(error)
    {
        res.status(480).json({status: 480, message: 'Fail in the search all devices'})
    }
}

export async function getDeviceController(req: Request, res: Response){
    try{
        const {id} = req.params;
        const device = await services.getDevice(new ObjectId(id));
        res.json(device)
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the search the device'})
    }
}

export async function createDeviceController(req:Request, res: Response){
    try{
        if(!req.body.serial || !req.body.ip || req.body.name || req.body.dueño || req.body.isActive)
    {
        return res.status(400).json({msg: 'Write all data'});    
    }
    const device = await Devices.findOne({serial: req.body.serial})
    if(device){
        return res.status(400).json({msg: 'The device already exists'})
    }
    const newDevice = new Devices(req.body);
        await services.createDevice(newDevice);
        res.json(`The device ${newDevice.id} was created  successfully`);
    }catch(error){
        res.status(400).json({status: 400, message: error})
    }
}

export async function deleteDeviceController(req:Request, res: Response){
    try{
        const { id } = req.params;
        const device = await services.deleteDevice(new ObjectId(id));
        res.json(`The device ${device.id} was deleted  successfully`);
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the delete to the device'})
    }
}

export const updateDeviceController = async (req:Request, res: Response) => {
    try{
        const device = await Devices.findById({_id: req.params.id}) 
        if(req.body.ip) device.set('ip', req.body.ip)
        if(req.body.name) device.set('name', req.body.name)
        if(req.body.serial) device.set('serial', req.body.serial)
        if(req.body.isActive) device.set('isActive', req.body.isActive)
        if(req.body.dueño) device.set('dueño', req.body.dueño)
        await device.save();
        res.json(`The device ${device.id} was update  successfully`);
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the update the device'})
    }
}