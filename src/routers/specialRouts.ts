import {Router} from "express";
import * as services from '../controllers/servicesController'
import * as devices from '../controllers/devicesControllers'
import {decodeTocken} from '../middleware/verifyToken'

class SpecialRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.get('/', decodeTocken , services.getUserAllController);
        this.router.patch('/', decodeTocken,  services.updateUserController);
        this.router.post('/', decodeTocken,  devices.createDeviceController);
        this.router.get('/devices', decodeTocken , devices.getDeviceAllController);
    }
}

const specialRouts = new SpecialRoutes();
specialRouts.routes();

export default specialRouts.router;
