import {ObjectId} from 'mongodb'; 
import {Request, Response} from 'express';
import {Devices, IDevice} from '../models/deviceSchema';

export async function getDeviceAllController(_req: Request, res: Response)
{
    try{
        const device = await Devices.getDeviceAll();
        res.json(device);
    }catch(error)
    {
        res.status(480).json({status: 480, message: 'Fail in the search all devices'})
    }
}

export async function getDeviceController(req: Request, res: Response){
    try{
        const device = await Devices.getDevice(new ObjectId(req.userId));
        res.json(device)
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the search the device'})
    }
}

export async function createDeviceController(req:Request, res: Response){
    try{
        if (req.body.updatedAt || req.body.creatededAt || req.body.id) {
            return res.status(400).json({ msg: "It can not update this parameters" });
        }
        const device = await Devices.findOne({serial: req.body.serial})
        if(device){
            return res.status(400).json({msg: 'The device already exists'})
        }
            const newDevice = await Devices.createDevice(req.body, req.userId);
            res.json(newDevice);
    }catch(error){
        console.log(error)
        res.status(400).json({status: 400, message: error})
    }
}

export async function deleteDeviceController(req:Request, res: Response){
    try{
        const device = await Devices.deleteDevice(new ObjectId(req.params.id));
        res.json(device);
    }catch(error){
        res.status(400).json({status: 400, message: 'Fail in the delete to the device'})
    }
}

export const updateDeviceController = async (req:Request, res: Response) => {
    try{
        if (req.body.updatedAt || req.body.createdAt || req.body.id) {
            return res.status(400).json({ msg: "It can not update this parameters" });
        }
        const device = await Devices.findOne({propietary: req.userId});
        console.log(device)
        const update : IDevice = await Devices.updateDevice(req.body, device)
        res.json(update);
    }catch(error){
        res.status(400).json({status: 400, message: error})
    }
}