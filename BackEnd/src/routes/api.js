const express = require('express');
const router = express.Router();
const show = require("@jongjun/console");
const cors = require("cors")

const passport = require('../middlewares/passport'),
    sign = require('../function/CheckAPIKey'),
    multer = require('../middlewares/multer/multer'),
    sharp = require('../middlewares/sharp'),
    recordCtrl = require('../middlewares/record'),
    designerCtrl = require('../middlewares/designer'),
    privacyCrtl = require('../middlewares/privacy');

//POST   
router.post('/join', cors(), passport.join);
router.post('/swagger/join', sign.checkApiKey, passport.join);

router.post('/authenticate', cors(), passport.authenticate);
router.post('/swagger/authenticate', sign.checkApiKey, passport.authenticate);

router.post('/designer', cors(), passport.isLoggedIn, designerCtrl.Post.designer)  
router.post('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Post.designer)

router.post('/record/:category', cors(), passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, recordCtrl.Post.record)
router.post('/swagger/record/:category', sign.checkApiKey, passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, recordCtrl.Post.record)

//GET
router.get('/main', cors(), passport.isLoggedIn, recordCtrl.Get.main)
router.get('/swagger/main', passport.isLoggedIn, recordCtrl.Get.main) 

router.get('/main/:category', cors(), passport.isLoggedIn, recordCtrl.Get.classification)
router.get('/swagger/main/:category', passport.isLoggedIn, recordCtrl.Get.classification)

router.get('/designer/', cors(), passport.isLoggedIn, designerCtrl.Get.designer)
router.get('/swagger/designer/', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.designer)

router.get('/favDesigner/', cors(), passport.isLoggedIn, designerCtrl.Get.favDesignerList)
router.get('/swagger/favDesigner/', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.favDesignerList)

router.get('/result/:category', cors(), passport.isLoggedIn, recordCtrl.Get.instanceResult);
router.get('/swagger/result/:category', sign.checkApiKey, passport.isLoggedIn, recordCtrl.Get.instanceResult);

router.get('/privacy/user', cors(), passport.isLoggedIn, privacyCrtl.Get.user)
router.get('/swagger/privacy/user', sign.checkApiKey, passport.isLoggedIn, privacyCrtl.Get.user)

// DELETE
router.post('/recordDelete', cors(), passport.isLoggedIn, recordCtrl.Delete.record);
router.post('/swagger/recordDelete', sign.checkApiKey, passport.isLoggedIn, recordCtrl.Delete.record);

router.post('/designerDelete', cors(), passport.isLoggedIn, designerCtrl.Delete.designer);
router.post('/swagger/designerDelete', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Delete.designer);

// UPDATE
router.post('/recordUpdate/:category', cors(), passport.isLoggedIn, multer.array("Image", 3), recordCtrl.Update.record);
router.post('/swagger/recordUpdate/:category', sign.checkApiKey, passport.isLoggedIn, multer.array("Image", 3), recordCtrl.Update.record);

router.post('/designerUpdate', cors(), passport.isLoggedIn, designerCtrl.Update.designer);
router.post('/swagger/designerUpdate', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Update.designer);



module.exports = router;