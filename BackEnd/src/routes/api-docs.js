import { Router } from 'express';
const router = Router();


    
import Swagger from '../../../Swagger/Swagger.js'

router.use('/', Swagger.Ui.serve, Swagger.Ui.setup(Swagger.specs, { explorer : true}));


export default router;