const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login',{user:req.user});
});

// auth logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/'); 
}); 

//auth with facebook
router.get('/facebook',passport.authenticate('facebook',{
    //scope : ['profile']
    scope: ['user_friends','email']
}));

//callback route for facebook to redirect to
router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
    //res.send(req.user); 
    res.redirect('/profile')

});
module.exports =router;

