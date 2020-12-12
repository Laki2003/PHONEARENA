const express = require('express');
const router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/logout', isLoggedIn, function(req, res,next){
    req.logout();
    res.redirect('/');
})
router.get('/panel', isLoggedIn, (req, res, next)=>{
    res.render('admin/panel')
})

router.use('/', notLoggedIn, function(req, res, next){
    next();
})


router.get('/login', function(req, res, next){
   message = req.flash('error');
    res.render('admin/login', {csrfToken: req.csrfToken(), messages: message, hasErrors: message.length>0});
})
router.post('/login', passport.authenticate('admin.login', {
    successRedirect: '/admin/panel',
    failureRedirect: '/admin/login',
    failureFlash: true
}))

module.exports = router;
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}