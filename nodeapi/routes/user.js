
const express= require('express');
const router=express.Router();
const {findPeople,removeFollowing,removeFollower,addFollowing,addFollower,userPhoto,userById,allUsers,getUser,updateUser,deleteUser}=require('../controllers/user')
const {requireSignin}=require('../controllers/auth')



router.put("/user/follow",requireSignin,addFollowing,addFollower)

router.get("/user/photo/:userId",userPhoto);
router.put("/user/unfollow",requireSignin,removeFollowing,removeFollower)
router.get("/users",allUsers);
router.get("/user/:userId",requireSignin,getUser); //anything after /user is taken as user id
router.put("/user/:userId",requireSignin,updateUser); //anything after /user is taken as user id
//to update we use put to make changes on a large scale
router.delete("/user/:userId",requireSignin,deleteUser); //anything after /user is taken as user id

router.get("/user/findpeople/:userId",requireSignin,findPeople)
router.param("userId",userById);
module.exports=router;