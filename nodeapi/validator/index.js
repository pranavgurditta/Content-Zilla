exports.createPostValidator= (req,res,next)=>{
    req.check('title','write a title').notEmpty()
    req.check('title','Title must be between 4 to 150 char').isLength({
        min:4,
        max:150
    });
    req.check('body','write a title').notEmpty()
    req.check('body','body must be between 4 to 150 char').isLength({
        min:4,
        max:150
    });

    const errors=req.validationErrors()

    if(errors)
    {
        const firstError=errors.map((error)=> error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next();
}

exports.userSignupValidator= (req,res,next)=>{

    req.check("name","Name is required").notEmpty();
    req.check("email","Email must be between 3 and 32 chars")
    .matches(/.+\@.+\..+/)
    .withMessage("email must containa @")
    .isLength({
        min:4,
        max:2000
    })

    req.check("password","PAssword is required").notEmpty();
    req.check('password')
    .isLength({min:6})
    .withMessage("Password must contain at 6 characters")
    .matches(/\d/)
    .withMessage("Passwor must contain a number")

    const errors=req.validationErrors()

    if(errors)
    {
        const firstError=errors.map((error)=> error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next();
}

//validator is created
//check method of express-validator and not empty() and length check are done
// if any error occurs req.validationErrors() store it.
//proceed to next middleware we use next() method