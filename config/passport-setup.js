const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model'); 


passport.serializeUser((user,done)=> {
    done(null,user.id)
});

passport.deserializeUser((id,done)=> {
    User.findById(id).then((user)=>{
        done(null,user);
    })
    
});


passport.use( new FacebookStrategy({
    //options for facebook strategy
    callbackURL: '/auth/facebook/redirect',
     clientID: keys.facebook.clientID,
     clientSecret: keys.facebook.clientSecret,
     profileFields: ['picture.type(large)']    
   },(accessToken,refreshToken,profile,done ) => {
       //check if user already exists in our DB
       User.findOne({sourceId:profile.id}).then((currentUser)=>{
           if(currentUser){
               //already have the user
               console.log(profile);
               done(null,currentUser);
           } else {
               console.log(profile);
               //create new user in the DB
               new User({
                username:profile.displayName,
                sourceId:profile.id,
                thumbnail:profile._json.picture.data.url,
                source:'facebook'
              
            }).save().then((newUser)=>{
               // console.log('new user created:'+newUser);
                done(null,newUser);
            })
           }

       })
    
   
    
})
); 