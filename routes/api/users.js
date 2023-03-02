const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');

//@royte GET        api/UserSchema
//@description      test route
//@acessvpublic     public
router.get('/',(req,res) => res.send('User route'));

//@route             POST api/user 
//@description       reqgister user
//@access            public

router.post('/',[
                  check('name','Name is required').not().isEmpty(),
                  check('email','Vaild email address required').isEmail(),
                  check('password','Password must have at least 4 characters').isLength({min:4})
                ],async(req,res)=>{
                    const errors = validationResult(req);
                    if(!errors.isEmpty()){
                        return res.status(400).json({errors: errors.array()})
                    }
    // destructuring so we don't have to prefix with 'req.body.'
    const {name,email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            console.log('User Already exists');
            return res.status(400).json({error:[{ msg: 'User already exists' }] });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
      //  await user.save();
        await user.save((err)=>{
            if(!err){
                console.log('User Saved Successfully');
               // res.json({success:[{msg:"User Saved Successfully"}]});
            }
        });


        // payload is part JWT tokken 
        const payload = {
            user:{
                id: user.id
            }
        }
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
      //  res.json(req.body);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;