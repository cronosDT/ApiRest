import  {Schema, model, Document, Model} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserAttrs {
    name: string
    lastName: string;
    email: string;
    phone: number;
    password: string;
}




export interface IUser extends Document {
    name: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    comprobePasswords: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    build(attrs: IUserAttrs): IUser;
    createUser(attrs: IUserAttrs): Promise<IUser>;
}

const UserSchema = new Schema({
    name: {
        type: String,
        require:true
    },
    lastName:{
        type: String,
        require:true
    },
    email:{
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        require:true
    },
    phone:{
         type: Number,
         require:true
    },
    password:{
        type: String,
        required: true
    } 
},{versionKey: false, timestamps: true});

UserSchema.pre<IUser>("save", async function(next){
    
    const schema = this;
    if(!schema.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(schema.password, salt); 
    schema.password = hash;
    next();
})

UserSchema.statics.build = function(attrs: IUserAttrs) {
    return new User(attrs)
}

UserSchema.statics.createUser = function(attrs: IUserAttrs) {
    const user = User.build(attrs);
    return user.save()
}

UserSchema.methods.comprobePasswords = async function(password: string): Promise<Boolean> {
    const schema = this;
    return await bcrypt.compare(password, schema.password);
  };

export const User = model<IUser, IUserModel>('User', UserSchema);