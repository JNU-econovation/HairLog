var express = require('express'),
    router = express.Router();

    
const Swagger = require('../../../Swagger/Swagger.js');

router.use('/', Swagger.Ui.serve, Swagger.Ui.setup(Swagger.specs, { explorer : true}));


module.exports = router;