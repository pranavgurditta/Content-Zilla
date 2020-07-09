
const {singlePost,photo,updatePost,like,unlike,
    isPoster,deletePost,postById,getPosts,
    createPost,postsByUser}=require('../controllers/post')
const express= require('express')
const router=express.Router()
const {userById}=require('../controllers/user')

const validators = require('../validator');
const {requireSignin}=require("../controllers/auth")
router.put("/post/like",requireSignin,like)
router.put("/post/unlike",requireSignin,unlike)
router.post('/post/new/:userId',requireSignin,createPost,validators.createPostValidator,);

router.get("/post/photo/:postId",photo);
router.get('/posts',getPosts);
router.get("/post/:postId",singlePost)
router.get("/posts/by/:userId",requireSignin,postsByUser)

router.put("/post/:postId",requireSignin,updatePost); //anything after /user is taken as user id
router.put("/post/like",requireSignin,like)
router.put("/post/unlike",requireSignin,unlike)

router.delete('/post/:postId',requireSignin,isPoster,deletePost);
router.param("userId",userById);
router.param("postId",postById);
module.exports=router;
//we would be using controllers to do task after a route request is made
// the router is made using router=express.Router and we use router.get(url,controller)
//router.get("/" for home page, postController to refer to controllers/post.js and accessing getPosts via .)
// when you want to create a post, a request is sent on  "/post" which is handled by createpost controller
//we import validator since index.js is implicitly called \
//createPostValidator method is mentioned in post function of router so that if post is validated then only createPost is done otherwise not

//documenting the api