var express = require('express');
var router = express.Router();
var show = require("@jongjun/console")

var passport = require('../middlewares/passport'),
    sign = require('../function/CheckAPIKey'),
    multer = require('../middlewares/multer/multer'),
    recordCtrl = require('../middlewares/record'),
    designerCtrl = require('../middlewares/designer'),
    test = require('../middlewares/test.js');

    
router.post('/join', passport.join);
router.post('/swagger/join', sign.checkApiKey, passport.join);

router.post('/joinDelete', passport.deleteAPITest);
router.post('/swagger/joinDelete', sign.checkApiKey, passport.deleteAPITest);

router.post('/authenticate', passport.authenticate);
router.post('/swagger/authenticate', sign.checkApiKey, passport.authenticate);

router.post('/singleRecord/:category', passport.isLoggedIn, multer.single("Image"), recordCtrl.Post.record)
router.post('/swagger/singleRecord/:category', sign.checkApiKey, passport.isLoggedIn, multer.single("Image"), recordCtrl.Post.record)

router.get('/getRecord', passport.isLoggedIn, recordCtrl.Get.record)
router.get('/swagger/getRecord', passport.isLoggedIn, recordCtrl.Get.record)

router.post('/designer',passport.isLoggedIn, designerCtrl.Post.designer)
router.post('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Post.designer)

router.get('/designer',passport.isLoggedIn, designerCtrl.Get.designer)
router.get('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.designer)

router.post('/test', function(req, rest) {
    rest.send(req.session.user)
});



module.exports = router;