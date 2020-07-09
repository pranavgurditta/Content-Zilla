const Post=require("../models/post")
const _=require('lodash')
const formidable=require('formidable')
const fs=require('fs') //to access file System


exports.getPosts=(req,res)=>{
    const posts=Post.find()
    .populate("postedBy","_id name").select("_id title body created likes")
        .sort({created:-1})
        .then((posts)=> {
            res.status(200).json(posts)
        })
        .catch(err=> console.log(err))
 };  

 exports.createPost=((req,res)=>{
     let form =new formidable.IncomingForm()
     form.keepExtensions=true
     form.parse(req,(err,fields,files)=>{
         if(err)
         {
             return res.status(400).json({
                 error:"Image could not be uploaded"
             })
         }
         let post=new Post(fields)
         req.profile.hashed_password=undefined;
         req.profile.salt=undefined;
         post.postedBy=req.profile

         if(files.photo){
             post.photo.data=fs.readFileSync(files.photo.path)
             post.photo.contentType=files.photo.type
         }
         post.save((err,result) => 
            {
                if(err){
                return res.status(400).json({
                    error:"Image could not be uploaded"
                })
            }
            res.json(result);
        
         
     })
    });
});
   
exports.postsByUser= (req,res)=>{
    Post.find({postedBy:req.profile._id})
    .populate("postedBy","_id name") //used because of another model is required
    .select("_id title body created likes")
    .sort("_created")
    .exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
       
        }
        res.json(posts);
    })
} 

exports.updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let post = req.post;
        post = _.extend(post, fields);
        post.updated = Date.now();

        if (files.photo)  {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(post);
        });
    });
};



exports.postById =(req,res,next,id)=>{

    Post.findById(id)
    .populate("postedBy","_id name").exec((err,post)=>{
        if(err || !post)
        {
            return res.status(400).json({
                error:"Post not found"
            })
        }
        req.post=post 
         next();    
    })
}


exports.isPoster= (req,res,next,id)=>{
    let isPoster= req.post && req.auth && req.post.postedBy._id==req.auth._id;
    console.log("req.post",req.post);
    console.log("req.post",req.post);
    console.log("req.post",req.post);
    console.log("req.post",req.post);
    if(!isPoster){
        return res.status(403).json({
            error:"User is not authorized"
        })
    }
    next();
};


exports.deletePost= (req,res)=>{
    let post=req.post;
    console.log("req.post",req.post);
    post.remove((err,post)=>{
        if(err){ 
                   return res.status(400).json({
            error:err
        })
    }

    res.json({
        message:"Post deleted successfully"
    })
});
}



exports.photo = (req,res)=>{
    console.log("hey")
    res.set('Content-Type',req.post.photo.contentType)
    return res.send(req.post.photo.data);
    
}
//formidable is used for filehandling hence npm it
//use x-www-form and add fields for form data in postman

exports.singlePost=(req,res)=>{
    return res.json(req.post)
}

exports.like=(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{ $push: { likes:req.body.userId } },{ new:true }).exec(
        (err,result) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        else{
            res.json(result)
        }
    }

    )
}



exports.unlike=(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{ $pull: { likes:req.body.userId } },{ new:true }).exec(
        (err,result) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        else{
            res.json(result)
        }
    }

    )
}