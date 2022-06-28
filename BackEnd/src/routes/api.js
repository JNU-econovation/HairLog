const express = require('express');
const router = express.Router();
const show = require("@jongjun/console");

const passport = require('../middlewares/passport'),
    sign = require('../function/CheckAPIKey'),
    multer = require('../middlewares/multer/multer'),
    recordCtrl = require('../middlewares/record'),
    designerCtrl = require('../middlewares/designer'),
    privacyCrtl = require('../middlewares/privacy');

//POST   
router.post('/join', passport.join);
router.post('/swagger/join', sign.checkApiKey, passport.join);

router.post('/authenticate', passport.authenticate);
router.post('/swagger/authenticate', sign.checkApiKey, passport.authenticate);

router.post('/designer',passport.isLoggedIn, designerCtrl.Post.designer)  
router.post('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Post.designer)

router.post('/record/:category', passport.isLoggedIn, multer.single("Image"), recordCtrl.Post.record)
router.post('/swagger/record/:category', sign.checkApiKey, passport.isLoggedIn, multer.single("Image"), recordCtrl.Post.record)

//GET
router.get('/main', passport.isLoggedIn, recordCtrl.Get.main)
router.get('/swagger/main', passport.isLoggedIn, recordCtrl.Get.main) 

router.get('/main/:category', passport.isLoggedIn, recordCtrl.Get.classification)
router.get('/swagger/main/:category', passport.isLoggedIn, recordCtrl.Get.classification)

router.get('/designer/',passport.isLoggedIn, designerCtrl.Get.designer)
router.get('/swagger/designer/', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.designer)

router.get('/favDesigner/',passport.isLoggedIn, designerCtrl.Get.favDesignerList)
router.get('/swagger/favDesigner/', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.favDesignerList)

router.get('/result/:category', passport.isLoggedIn, recordCtrl.Get.instanceResult);
router.get('/swagger/result/:category', sign.checkApiKey, passport.isLoggedIn, recordCtrl.Get.instanceResult);

router.get('/privacy/user', passport.isLoggedIn, privacyCrtl.Get.user)
router.get('/swagger/privacy/user', sign.checkApiKey, passport.isLoggedIn, privacyCrtl.Get.user)


router.post('/joinDelete', passport.deleteAPITest);
router.post('/swagger/joinDelete', sign.checkApiKey, passport.deleteAPITest);


module.exports = router;