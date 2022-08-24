import  {Schema, model, Document, Model} from 'mongoose';
import {ObjectId} from 'mongodb'; 
import bcrypt from 'bcrypt';

export interface IUserAttrs {
    name: string
    email: string;
    phone: number;
    password: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    phone: number;
    password: string;
    comprobePasswords: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    build(attrs: IUserAttrs): IUser;
    createUser(attrs: IUserAttrs): Promise<IUser>;
    getUserAll(): Promise<IUser>;
    getUser(id: ObjectId) : Promise<IUser>;
    deletUser(id: ObjectId) : Promise<IUser>;
    updatUser(attrs: IUserAttrs, attrs2: IUserAttrs) : Promise<IUser>;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        required:true
    },
    phone:{
         type: Number,
         required:true
    },
    password:{
        type: String,
        required: true
    } 
},{versionKey: false, timestamps: true});

UserSchema.pre<IUser>("save", async function(next){
    
    const schema = this;
        if(!schema.isModified('password')){
             return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(schema.password, salt); 
        schema.password = hash;
        
        next();
})

// UserSchema.pre<IUser>("validate", async function(next){
    
//     const schema = this;
//         if(schema.isNew){
//             const included = ["name", "email", "phone", "password"  ]
//             const updates = schema.modifiedPaths();
//             const isInvalid =  updates.every(fields => included.includes(fields))
//             next(!isInvalid ? new Error("the create is invalid, check de fields") : undefined);
//         }else{
//             const restricted = ["id", "createdAt", "updatedAt" ]
//             const updates = schema.modifiedPaths();
//             const isInvalid =  updates.every(fields => restricted.includes(fields))
//             next(isInvalid ? new Error("the update is invalid, check de fields") : undefined);
//         }
// })

UserSchema.statics.build = function(attrs: IUserAttrs) {
    return new User(attrs)
}

UserSchema.statics.createUser = function(attrs: IUserAttrs) {
    const user = User.build(attrs);
    return user.save()
}

UserSchema.statics.getUserAll = function(){
    return User.find();
}

UserSchema.statics.getUser = function(id: ObjectId){
    return User.findById({_id: id}).select('-password');
}

UserSchema.statics.deletUser = function(id: ObjectId){
    return User.findByIdAndRemove({_id: id});
}

UserSchema.statics.updatUser = function(attrs: { [key: string]: any}, attrs2: { [key: string]: any}) {
    const user = Object.keys(attrs);
    user.forEach(field =>{
         attrs2[field] = attrs[field]
    })
    return attrs2.save()
}

UserSchema.methods.comprobePasswords = async function(password: string): Promise<Boolean> {
    const schema = this;
    return await bcrypt.compare(password, schema.password);
  };

export const User = model<IUser, IUserModel>('User', UserSchema);