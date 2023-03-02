const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res, next){
    const token=req.header('x-auth-token');

    // check for token (statud 401 = not authorized)
    // we needd to specify a header with content-type = x-auth-token  ----> value(generated token with post method) in postman to get user data as result
    //if token is present it will decode the user and send to get route and returns users data from DB
    if(!token){
        return res.status(401).json({msg: 'Not authorised'});
    }
        //validate tocken

        try{
            const decoded = jwt.verify(token, config.get('jwtSecrete'));
            req.user = decoded.user;
            next(); // Reffer this URL for understanding next() function https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express
        }catch(err){
            res.status(401).json({msg: 'invalid token'});
        }
    
}