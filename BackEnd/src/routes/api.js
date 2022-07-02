const express = require('express');
const router = express.Router();
const show = require("@jongjun/console");

const passport = require('../middlewares/passport'),
    sign = require('../function/CheckAPIKey'),
    multer = require('../middlewares/multer/multer'),
    sharp = require('../middlewares/sharp'),
    recordCtrl = require('../middlewares/record'),
    designerCtrl = require('../middlewares/designer'),
    privacyCrtl = require('../middlewares/privacy');
const { designer } = require('../function/classifyCategory');

//POST   
router.post('/join', passport.join);
router.post('/swagger/join', sign.checkApiKey, passport.join);

router.post('/authenticate', passport.authenticate);
router.post('/swagger/authenticate', sign.checkApiKey, passport.authenticate);

router.post('/designer',passport.isLoggedIn, designerCtrl.Post.designer)  
router.post('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Post.designer)

router.post('/record/:category', passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, recordCtrl.Post.record)
router.post('/swagger/record/:category', sign.checkApiKey, passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, recordCtrl.Post.record)

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

// DELETE
router.post('/recordDelete', recordCtrl.Delete.record);
router.post('/swagger/recordDelete', sign.checkApiKey, recordCtrl.Delete.record);

router.post('/designerDelete', designerCtrl.Delete.designer);
router.post('/swagger/designerDelete', sign.checkApiKey, designerCtrl.Delete.designer);

// UPDATE
router.post('/recordUpdate/:category', multer.array("Image", 3), recordCtrl.Update.record);
router.post('/swagger/recordUpdate/:category', sign.checkApiKey, multer.array("Image", 3), recordCtrl.Update.record);

router.post('/designerUpdate', designerCtrl.Update.designer);
router.post('/swagger/designerUpdate', sign.checkApiKey, designerCtrl.Update.designer);



router.post('/test', passport.isLoggedIn, recordCtrl.Delete.record)

module.exports = router;