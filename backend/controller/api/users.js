const User = require('../../models/user');
const ErrorResponse = require('../../utils/ErrorResponse');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


// controller for get logged in user
module.exports.getUser = async (req,res,next) => {
    let userId = req.params.id;
    try {
       let user = await User.findById(userId).select('username phone_number');
       if(!user) {
          return next(new EroreResponse(`user not found with this id ${userId}`) , 404);
       }
       res.status(200).json({
        success : true, 
        user : user,
     });
    } catch (error) {
        return next(error);
    }
}

// controller for login (sign in  usser)
module.exports.login = async (req,res,next) => {
   const {phone_number , password} = req.body;
   try {
       let user = await User.findOne({ phone_number: phone_number});
       let token =  jwt.sign({userId : user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        if(!user) {
            return next(new ErrorResponse('Invalid Phone Number..') , 404);
        }

        bcrypt.compare(password, user.password, function(err, isCorrect) {
            if(err) {
                return next(new ErrorResponse(err.message) , 404);
            }
            // result == true
            if(isCorrect) {
                res.status(200).json({
                    user : user,
                    access_token : token
                })
            }
            else {
                return next(new ErrorResponse("Invalid password") , 404);
            }
        });
        
   } catch (error) {
    return next(new ErrorResponse(error.message) , error.statusCode);
   }
}


// controller for signup (create new usser)
module.exports.createUser = async (req,res,next) => {
   const {phone_number , username , password} = req.body;
   try {
      let user = await User.findOne({phone_number: phone_number});
      if(user) {
        return next(new ErrorResponse('This user is already exists' , 409));
      }
      else {
        // convert plan password into hased
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                // Store hash in your password DB.
                if(err) {
                  next(err);
                }
                // create user with hased password
                await User.create({
                    username,
                    phone_number,
                    password : hash
                });
                // response back to client
                res.status(201).json({
                    success : true,
                    message : 'User Successfully registered....'
                });
            });
      }
     
   } catch (err) {
      return next(err);
   }
}