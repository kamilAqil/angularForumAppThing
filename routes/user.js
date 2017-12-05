var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
router.post('/', function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    console.log(user);
    user.save(function(err,result){

        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        res.status(201).json({
            message:'User created',
            obj:result
        });
    });
});

router.post('/signin',function(req,res,next){
    console.log('sign in route was hit');
    User.findOne({email:req.body.email},function(err,user){
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        if(!user){
            return res.status(401).json({
                title:'Login Failed',
                error:{message:'User could not be found'}
            });
        }

        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(401).json({
                title:'Login Failed',
                error:{message:'Invalid Login'}
            });
        }

        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        res.status(200).json({
            message:'Successfully logged in',
            token:token,
            userId:user._id
        });

    });
});

module.exports = router;
