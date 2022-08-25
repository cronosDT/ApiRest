import { Schema, Document, model, Model} from "mongoose"
import {ObjectId} from 'mongodb'; 
import { User } from "./userSchema";

export interface IDeviceUtils{
    ip:string
    name: string 
    propietary: string
    propietaryId: string
    serial: string
    isActive: boolean
}

export interface IDevice extends Document{
    ip:string
    name: string 
    propietary: string
    propietaryId: string
    serial: string
    isActive: boolean
}

export interface IDeviceModel extends Model<IDevice>{
    build(device: IDeviceUtils): IDevice;
    getDeviceAll(): Promise<IDevice>
    getDevice(id: ObjectId): Promise<IDevice>
    deleteDevice(id: ObjectId): Promise<IDevice>
    updateDevice(newDevice: IDeviceUtils, device: IDeviceUtils) : Promise<IDevice>;
    createDevice(device: IDeviceUtils, id: string): Promise<IDevice>
    namePropietary(id: string, name: string): Promise<string>
}

const devicesSchema = new Schema({
    ip: {
        type: String,
        required: true,
        allowNull: false
    },
    name: {
        type: String,
        required: true,
        allowNull: false
    },
    propietary: {
        type: String, 
    },
    propietaryId: {
        type: String, 
        ref: "User",
    },
    serial: {
        type: String,
        required: true 
    },
    isActive: {
        type: Boolean,
        required: true
    }

}, {versionKey: false, timestamps: true});

devicesSchema.pre<IDevice>("save", async function(next){
    const schema = this;

    const user = User.findById({_id: schema.propietaryId})
    schema.propietary = (await user).name;
    
    if(!schema.isNew){
        const restricted = ["id", "createdAt", "updatedAt", "propietary" ]
        const updates = schema.modifiedPaths();
        const isInvalid =  updates.every(fields => restricted.includes(fields))
        next(isInvalid ? new Error("the update is invalid, check de fields") : undefined);
    }
    
    next();
})

devicesSchema.statics.build = function(device: IDeviceUtils){
    return new Devices(device);
}

devicesSchema.statics.getDeviceAll = function(){
    return Devices.find().select('-propietaryId');
}
devicesSchema.statics.getDevice = function(id: ObjectId){
    return Devices.findById({_id: id}).select('-propietaryId')
}
devicesSchema.statics.deleteDevice = function(id: ObjectId){
    return Devices.findByIdAndRemove({_id: id}).select('-propietaryId')
}
devicesSchema.statics.updateDevice = function(newDevice: { [key: string]: any}, device: { [key: string]: any}){
    const updateDevice = Object.keys(newDevice)
    updateDevice.forEach(field =>{
        device[field] = newDevice[field]
    })
    return device.save();
}
devicesSchema.statics.createDevice = function(device: IDeviceUtils, id: string){
    const newdevice = Devices.build(device);    
    newdevice.propietaryId = id;
    return newdevice.save();
}

export const secondDevice = model<IDeviceUtils, IDevice>('secondDevice', devicesSchema)
export const Devices =  model<IDevice, IDeviceModel>('Devices', devicesSchema)