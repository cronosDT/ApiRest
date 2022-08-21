import express from 'express';
import morgan from 'morgan';
import DB from './config/mongodb';
import routs from './routers/index'
import loginRouts from './routers/LoginRout'
import specialRouts from './routers/specialRouts'
import devicesRouts from './routers/devicesRouts'
const app  = express();


//config
async function dbActive(){
    await new DB();
}
dbActive();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('port', process.env.PORT || 3000 );


//routes;
app.use("/user", routs);
app.use("/login", loginRouts);
app.use("/special", specialRouts);
app.use("/devices", devicesRouts)


//listen
app.listen(app.get('port'), () => {
    console.log(`server running ooon port ${app.get('port')}`);
});
