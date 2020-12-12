const nodemailer = require("nodemailer")
const creds = require('./creds');

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.USER,
        pass: creds.PASSWORD
    }
}
var transporter = nodemailer.createTransport(transport);
transporter.verify((error, success)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('Server is ready to take messages');
    }
})

module.exports = transporter