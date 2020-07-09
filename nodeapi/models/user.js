const mongoose= require('mongoose');
const uuidv1=require('uuid/v1');
const crypto=require('crypto');
const {ObjectId}=mongoose.Schema
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type:String,
        required:true,
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now
    },
    update:Date,

    photo:{
        data:Buffer,
        contentType:String
    },
    about:{
        type:String,
        trim:true
    },
    following:[{type:ObjectId,ref:"User"}],
    followers:[{type:ObjectId,ref:"User"}],
    
    })

userSchema.virtual('password')
.set(function(password){
    this._password=password
    //geenerate a timestamp
    this.salt=uuidv1()
    //encrypt password

    this.hashed_password= this.encryptPassword(password)
})
.get(function(){
    return this._password
});


userSchema.methods={

    authenticate: function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    },


    encryptPassword: function(password){
        if(!password)
        return "";
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest("hex")
        }catch(err){}
        }
    };

module.exports=mongoose.model('User',userSchema);

//hashed_password to store encrypted password
//salt is a random string "kwdjhfkjewhfkjewhdo"
//virtual field is used to accept hashed_password
//virtual fields are additional fields for a given model and their values can be set automatically or manually 
//virtual properties dont get persisted in the database and exist logically and are not written to DB like password
//hashed_password is written to DB not virtual field password
//uuid to create timestamp , this package is used
//userSchema.methods is used to declare functions working on user schema
//crypto is used to encrypt in nodeJS pre installed package

//sha1 is standard for hashing
//
//userSchema.virtual('password )-- uses password as a virtual field which is sent to set
/*.set( takes a function(password){
    this._password=password; //temporary variable for password
    //
    salt has time stamp using uuidv1()
    this.hashed_password refers to userScehma =this.encrpytPassword(password--this is what you enetered in the field))
    */

/* to add methods to schema is using objects like these  userSchema.methods={
    encryptPassword: function(password){
        crypto.createHmac( is used to encrypt password and update(password))
    }

    }
}
*/