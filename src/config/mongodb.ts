import mongoose from 'mongoose';

class ConnectionMongo{
    private static _connectDb: ConnectionMongo;
    constructor(){
          this.connecionmDB();
    }   
    connecionmDB(){
        mongoose.connect('mongodb://user:password@mongo:27017/users?authSource=admin')
        .then(()=>console.log("Connection successfully to DB"))
        .catch(()=>console.log("conection failed"));
    }
    static getConnectdb(){
        if(!this._connectDb){
            return this._connectDb;
        }

        this._connectDb = new ConnectionMongo();
        return this._connectDb;
    }
}
export default ConnectionMongo;