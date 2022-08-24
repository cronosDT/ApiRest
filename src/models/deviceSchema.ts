import { Schema, Document, model, Model} from "mongoose"
import {ObjectId} from 'mongodb'; 

export interface IDeviceUtils{
    ip:string
    name: string 
    serial: string
    propietary: string
    propietaryId: string
    isActive: boolean
}

export interface IDevice extends Document{
    ip:string
    name: string 
    serial: string
    propietary: string
    propietaryId: string
    isActive: boolean
}

export interface IDeviceModel extends Model<IDevice>{
    build(device: IDeviceUtils): IDevice;
    getDeviceAll(): Promise<IDevice>
    getDevice(id: ObjectId): Promise<IDevice>
    deleteDevice(id: ObjectId): Promise<IDevice>
    updateDevice(newDevice: IDeviceUtils, device: IDeviceUtils) : Promise<IDevice>;
    createDevice(device: IDeviceUtils, id: string): Promise<IDevice>
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
    serial: {
        type: String,
        required: true 
    },
    propietary: {
        type: String, 
        required: true
    },
    propietaryId: {
        type: String, 
        ref: "User",
    },
    isActive: {
        type: Boolean,
        required: true
    }

}, {versionKey: false, timestamps: true});

devicesSchema.pre<IDevice>("save", async function(next){
    
    const schema = this;
    schema.propietary = schema.propietaryId
        if(schema.isNew){
            return next();
        }else{
            const restricted = ["id", "createdAt", "updatedAt", "dueño", "dueñoId" ]
            const updates = schema.modifiedPaths();
            const isInvalid =  updates.every(fields => restricted.includes(fields))
            next(!isInvalid ? new Error("the update is invalid, check de fields") : undefined);
        }
})

devicesSchema.statics.build = function(device: IDeviceUtils){
    return new Devices(device);
}

devicesSchema.statics.getDeviceAll = function(){
    return Devices.find();
}
devicesSchema.statics.getDevice = function(id: ObjectId){
    return Devices.findById({_id: id}).select('-dueñoId')
}
devicesSchema.statics.deleteDevice = function(id: ObjectId){
    return Devices.findByIdAndRemove({_id: id})
}
devicesSchema.statics.updateDevice = function(newDevice: { [key: string]: any}, device: { [key: string]: any}){
    const updateDevice = Object.keys(newDevice)
    updateDevice.forEach(field =>{
        device[field] = newDevice[field]
    })
}
devicesSchema.statics.createDevice = function(device: IDeviceUtils, id: string){
    const newdevice = Devices.build(device);    
    newdevice.propietaryId = id;
    console.log(newdevice.propietaryId)
    return newdevice.save();
}

export const secondDevice = model<IDeviceUtils, IDevice>('secondDevice', devicesSchema)
export const Devices =  model<IDevice, IDeviceModel>('Devices', devicesSchema)