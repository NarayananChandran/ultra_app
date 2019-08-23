const express = require('express');
const User = require('../model/user');
const mongoose = require('mongoose');

const router = new express.Router();


router.get('/signUp', (req, res)=>{
    res.render('signUp');
});
router.post('/signUp', async (req, res)=>{
    let user = new User(req.body);
    try{
        await user.save();
        req.session.user_id = user._id.toString();
        res.redirect('/');

    }catch(e){
        res.status(400).send(e);
    }
});
router.get('/signIn', (req, res)=>{
    res.render('signIn');
});
router.post('/signIn', async (req, res)=>{
    try{
        let user = await User.findByCredentials(req.body.email, req.body.password);
        req.session.user_id = user._id.toString();
        res.redirect('/');
    }catch(e){
        res.status(400).send(e);
    }
    
});
router.get('/logout', async (req, res)=>{
    //let user = await User.getUserFromToken(req.sessionID);
    //user.tokens = [];
    ///await user.save();
    req.session.destroy();
    res.render('signIn');
});


module.exports = router;
