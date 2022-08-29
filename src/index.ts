import express from 'express';
import morgan from 'morgan';
import DB from './config/mongodb';
import routs from './routers/index'
import loginRouts from './routers/LoginRout'
import specialRouts from './routers/specialRouts'
import devicesRouts from './routers/devicesRouts'
import cors from 'cors'
const app  = express();


//cors
const corsOption = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}


//config
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('port', process.env.PORT || 3000 );
app.use(cors(corsOption));

//routes;
app.use("/user", routs);
app.use("/login", loginRouts);
app.use("/special", specialRouts);
app.use("/devices", devicesRouts)


//listen
app.listen(app.get('port'), async () => {
    try {
        await new DB();
        console.log('Server running on port: ', app.get('port'))
    } catch (error) {
        process.exit(0)        
    }
});
