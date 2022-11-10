const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    //  make sure the token exits
    if(!token) {
      return next(new ErrorResponse('Not Authorized to access this route') , 401);
    }
     
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        next();
      } catch(err) {
        // err
        return next(new ErrorResponse(err.message) , err.statusCode);
    }
}