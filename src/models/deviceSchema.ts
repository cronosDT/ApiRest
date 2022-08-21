import { Schema, Document, model} from "mongoose"

export interface IDevice extends Document{
    ip:string
    name: string 
    serial: string
    dueño: string
    isActive: boolean
}

const devicesSchema = new Schema({
    ip: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    serial: {
        type: String,
        require: true 
    },
    dueño: {
        type: String,
        require: true 
    },
    isActive: {
        type: Boolean,
        require: true
    }

}, {versionKey: false});

export default model<IDevice>('Devices', devicesSchema)