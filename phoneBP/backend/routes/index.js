var express = require("express");
const transporter = require('../config/nodemailer')
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index')

})
router.get('/phone', (req, res) => {
    res.render('phone')
})

router.get('/contact', (req, res) => {
  res.render('contact');
})
router.get('/compare', (req, res) => {
  res.render('compare');
})


router.post('/sendmessage', (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var msg = req.body.msg;
  var content = "Ime: "+name+"\n" + "Email: " + email + "\n" +"Poruka: "+ msg;
  var mail = {
      from: name,
      to: creds.USER,
      subject: subject,
      text: content
  }
transporter.sendMail(mail, (err, data)=>{
    if(err){
        res.json({msg: 'fail'});
      }
      else{
        res.json({msg: 'success'})
        
      }
})
res.send('<h1>Message sent</h1>')
})
module.exports = router