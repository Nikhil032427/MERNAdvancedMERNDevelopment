const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const { Router } = require('express');

// @route           GET api/auth
// @description     test route
// @access          public

router.get('/',auth, async (req,res) => {
    try{
        const user = await (User.findById(req.user.id).select('-password')); // .select('-password') is to exclude password from being returned;
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');

    }
});

// @route           POST api/auth
// @description     authenticate user and get token
// @access          public
router.post('/', [
    check('email','Valid email address required').isEmail(),
    check('password', 'Password required').exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg: 'invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errros: [{msg: 'invalid credentials'}]});

        }

        const payload = {
            user : {
                id: user.id
            }
        }

        // sign the token, pass in payload, pass in secrect, expiration(optional)
        // inside the callback if we dont get an error we send back the token

        jwt.sign(
            payload,
            config.get('jwtSecrete'),
            {expiresIn: 720000}, //optional
            (err,token) => {
                console.log(token);
                if(err) throw err;
                res.json({token});
            }
        );
     
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

module.exports = router;
 