import {Router} from 'express';
import {getUserController, deleteUserController} from '../controllers/servicesController'

class IndexRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.get('/:id', getUserController);
        this.router.delete('/:id', deleteUserController);
    }
}

const crudRoutes = new IndexRoutes();
crudRoutes.routes();

export default crudRoutes.router;


