const User = require('../model/user')

const auth = async (req, res, next)=>{
    let isuser = await User.getUserFromToken(req.session.user_id);
    if(isuser){
	console.log('authenticate on linux machine');
        next();
    }else{
	console.log('not authenticate on linux machine');
        res.redirect('/signIn');
    }    
}

module.exports = auth;
