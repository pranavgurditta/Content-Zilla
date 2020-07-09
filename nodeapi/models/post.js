const mongoose=require('mongoose')
const {ObjectId}= mongoose.Schema
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true 

    },
    photo:{
        data:Buffer,
        contentType:String

    },
    postedBy:{
        type: ObjectId,//builds the relationship between user and post
        ref: "User"
    },
    created:{
        type:Date,
        default: Date.now

    },
    updated:Date
});

module.exports=mongoose.model("Post",postSchema);

//minlength,maxlength all are predefined properties defined in schema
// when a new post is created it is creadted by some user, hence we need to have user field for each post
