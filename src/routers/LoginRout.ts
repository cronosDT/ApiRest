import {Router} from 'express';
import * as services from '../controllers/servicesController'
import * as login from '../controllers/usersCrontoller'

class LoguinRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.post('/signUp', services.createUserController);
        this.router.post('/signIn', login.signIn)
    }
}

const loginRouts = new LoguinRoutes();
loginRouts.routes();

export default loginRouts.router;
