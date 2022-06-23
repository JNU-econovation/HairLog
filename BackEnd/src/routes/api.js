var express = require('express');
var router = express.Router();
var show = require("@jongjun/console")

var passport = require('../middlewares/passport'),
    sign = require('../function/CheckAPIKey'),
    multer = require('../middlewares/multer/multer'),
    recordCtrl = require('../middlewares/record'),
    designerCtrl = require('../middlewares/designer'),
    privacyCrtl = require('../middlewares/privacy')
    test = require('../middlewares/test.js');

//POST   
router.post('/join', passport.join);
router.post('/swagger/join', sign.checkApiKey, passport.join);

router.post('/designer',passport.isLoggedIn, designerCtrl.Post.designer)
router.post('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Post.designer)

router.post('/authenticate', passport.authenticate);
router.post('/swagger/authenticate', sign.checkApiKey, passport.authenticate);

router.post('/record/:category', passport.isLoggedIn, multer.single("Image"), recordCtrl.Post.record)
router.post('/swagger/record/:category', sign.checkApiKey, passport.isLoggedIn, multer.single("Image"), recordCtrl.Post.record)

//GET
router.get('/main', passport.isLoggedIn, recordCtrl.Get.main)
router.get('/swagger/main', passport.isLoggedIn, recordCtrl.Get.main)

router.get('/main/:standard', passport.isLoggedIn, recordCtrl.Get.classification)
router.get('/swagger/main/:standard', passport.isLoggedIn, recordCtrl.Get.classification)

router.get('/designer',passport.isLoggedIn, designerCtrl.Get.designer)
router.get('/swagger/designer', sign.checkApiKey, passport.isLoggedIn, designerCtrl.Get.designer)

router.get('/record/:standard', passport.isLoggedIn, multer.single("Image"), recordCtrl.Get.classification)
router.get('/swagger/record/:standard', sign.checkApiKey, passport.isLoggedIn, multer.single("Image"), recordCtrl.Get.classification)

router.get('/result', passport.isLoggedIn, recordCtrl.Get.result);
router.get('/swagger/result', sign.checkApiKey, passport.isLoggedIn, recordCtrl.Get.result);

router.get('/privacy/user', passport.isLoggedIn, privacyCrtl.Get.user)
router.get('/swagger/privacy/user', sign.checkApiKey, passport.isLoggedIn, privacyCrtl.Get.user)


router.post('/joinDelete', passport.deleteAPITest);
router.post('/swagger/joinDelete', sign.checkApiKey, passport.deleteAPITest);


module.exports = router;