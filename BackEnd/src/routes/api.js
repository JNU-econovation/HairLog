import { Router } from 'express';
const router = Router();
import show from "@jongjun/console";
import cors from "cors";

import passport from '../middlewares/passport.js';
import checkApiKey from '../function/CheckAPIKey.js';
import multer from '../middlewares/multer/multer.js';
import sharp from '../middlewares/sharp.js';
import record from '../middlewares/record.js';
import designer from '../middlewares/designer.js';
import privacy from '../middlewares/privacy.js';


//POST   
router.post('/join', passport.join);
router.post('/swagger/join', checkApiKey, passport.join);

router.post('/authenticate', passport.authenticate);
router.post('/swagger/authenticate', checkApiKey, passport.authenticate);

router.post('/checkPassword', passport.checkPassword);
router.post('/swagger/checkPassword', checkApiKey, passport.checkPassword);

router.post('/designer', passport.isLoggedIn, designer.Post.designer)  
router.post('/swagger/designer', checkApiKey, passport.isLoggedIn, designer.Post.designer)

router.post('/record/:category', passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, record.Post.record)
router.post('/swagger/record/:category', checkApiKey, passport.isLoggedIn, multer.array("Image", 3), sharp.sharping, record.Post.record)

//GET
router.get('/main', passport.isLoggedIn, record.Get.main)
router.get('/swagger/main', passport.isLoggedIn, record.Get.main) 

router.get('/main/:category', passport.isLoggedIn, record.Get.classification)
router.get('/swagger/main/:category', passport.isLoggedIn, record.Get.classification)

router.get('/designer/', passport.isLoggedIn, designer.Get.designer)
router.get('/swagger/designer/', checkApiKey, passport.isLoggedIn, designer.Get.designer)

router.get('/favDesigner/', passport.isLoggedIn, designer.Get.favDesignerList)
router.get('/swagger/favDesigner/', checkApiKey, passport.isLoggedIn, designer.Get.favDesignerList)

router.get('/instance', passport.isLoggedIn, record.Get.instance);
router.get('/swagger/instance', checkApiKey, passport.isLoggedIn, record.Get.instance);

router.get('/result', passport.isLoggedIn, record.Get.result);
router.get('/swagger/result', checkApiKey, passport.isLoggedIn, record.Get.result);

router.get('/privacy/user', passport.isLoggedIn, privacy.Get.user)
router.get('/swagger/privacy/user', checkApiKey, passport.isLoggedIn, privacy.Get.user)

// DELETE
router.post('/recordDelete', passport.isLoggedIn, record.Delete.record);
router.post('/swagger/recordDelete', checkApiKey, passport.isLoggedIn, record.Delete.record);

router.post('/designerDelete', passport.isLoggedIn, designer.Delete.designer);
router.post('/swagger/designerDelete', checkApiKey, passport.isLoggedIn, designer.Delete.designer);

// UPDATE
router.post('/recordUpdate/:category', passport.isLoggedIn, multer.array("Image", 3), record.Update.record);
router.post('/swagger/recordUpdate/:category', checkApiKey, passport.isLoggedIn, multer.array("Image", 3), record.Update.record);

router.post('/designerUpdate', passport.isLoggedIn, designer.Update.designer);
router.post('/swagger/designerUpdate', checkApiKey, passport.isLoggedIn, designer.Update.designer);

router.post('/privacyUpdate/user', passport.isLoggedIn, privacy.Update.privacy)
router.post('/swagger/privacyUpdate/user', checkApiKey, passport.isLoggedIn, privacy.Update.privacy)


export default router;