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
router.post('/join', passport.join);
router.post('/swagger/join', sign.checkApiKey, passport.join);

router.post('/authenticate', passport.authenticate);
router.post('/swagger/authenticate', sign.checkApiKey, passport.authenticate);

router.post('/checkPassword', passport.checkPassword);
router.post('/swagger/checkPassword', sign.checkApiKey, passport.checkPassword);

router.post('/designer', passport.isLoggedIn, designerCtrl.Post.designer)  
router.post('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Post.designer)

router.post('/record/:category', passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, recordCtrl.Post.record)
router.post('/swagger/record/:category', sign.checkApiKey, passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, recordCtrl.Post.record)

//GET
router.get('/main', passport.isLoggedIn, recordCtrl.Get.main)
router.get('/swagger/main', passport.isLoggedIn, recordCtrl.Get.main) 

router.get('/main/:category', passport.isLoggedIn, recordCtrl.Get.classification)
router.get('/swagger/main/:category', passport.isLoggedIn, recordCtrl.Get.classification)

router.get('/designer/', passport.isLoggedIn, designerCtrl.Get.designer)
router.get('/swagger/designer/', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.designer)

router.get('/favDesigner/', passport.isLoggedIn, designerCtrl.Get.favDesignerList)
router.get('/swagger/favDesigner/', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.favDesignerList)

router.get('/instance', passport.isLoggedIn, recordCtrl.Get.instance);
router.get('/swagger/instance', sign.checkApiKey, passport.isLoggedIn, recordCtrl.Get.instance);

router.get('/result', passport.isLoggedIn, recordCtrl.Get.result);
router.get('/swagger/result', sign.checkApiKey, passport.isLoggedIn, recordCtrl.Get.result);

router.get('/privacy/user', passport.isLoggedIn, privacyCrtl.Get.user)
router.get('/swagger/privacy/user', sign.checkApiKey, passport.isLoggedIn, privacyCrtl.Get.user)

// DELETE
router.post('/recordDelete', passport.isLoggedIn, recordCtrl.Delete.record);
router.post('/swagger/recordDelete', sign.checkApiKey, passport.isLoggedIn, recordCtrl.Delete.record);

router.post('/designerDelete', passport.isLoggedIn, designerCtrl.Delete.designer);
router.post('/swagger/designerDelete', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Delete.designer);

// UPDATE
router.post('/recordUpdate/:category', passport.isLoggedIn, multer.array("Image", 3), recordCtrl.Update.record);
router.post('/swagger/recordUpdate/:category', sign.checkApiKey, passport.isLoggedIn, multer.array("Image", 3), recordCtrl.Update.record);

router.post('/designerUpdate', passport.isLoggedIn, designerCtrl.Update.designer);
router.post('/swagger/designerUpdate', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Update.designer);

router.post('/privacyUpdate/user', passport.isLoggedIn, privacyCrtl.Update.privacy)
router.post('/swagger/privacyUpdate/user', sign.checkApiKey, passport.isLoggedIn, privacyCrtl.Update.privacy)


module.exports = router;