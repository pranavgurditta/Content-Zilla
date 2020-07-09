
const express= require('express');
const router=express.Router();
//const validators = require('../validator');
const userAuth= require('../controllers/auth');
const {userById}=require('../controllers/user')
const {userSignupValidator}=require('../validator')
router.post('/signup',userSignupValidator,userAuth.signup);
router.post('/signin',userAuth.signin);
router.get('/signout',userAuth.signout);
module.exports=router;
router.param("userId",userById);

//