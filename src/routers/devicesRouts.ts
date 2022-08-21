import * as devices from '../controllers/devicesControllers'
import {Router} from 'express';

class DevicesRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.patch('/:id', devices.updateDeviceController);
        this.router.delete('/:id', devices.deleteDeviceController);
        this.router.get('/:id', devices.getDeviceController)
    }
}

const devicesRouts = new DevicesRoutes();
devicesRouts.routes();

export default devicesRouts.router;
