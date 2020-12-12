var passport = require('passport');
var Administrator = require('../models/admin');

var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(admin, done){
    done(null, admin._id);
});

passport.deserializeUser(function(id, done){
    Administrator.findById(id, function(err, admin){
        done(err, admin);

    });
});

passport.use('admin.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, function(req, email, password, done){
 
    Administrator.findOne({'email':email}, function(err, admin){
        if(err){
            return done(err);
        }
        if(!admin){
            return done(null, false, {message: 'Administrator sa ovo email adresom ne postoji!'});
                    }
                    console.log(admin);
                    if(admin.password != password){
                        return done(null, false, {message: "Pogresna sifra"});
                    }
                    
                    return done(null, admin);
    })
}))