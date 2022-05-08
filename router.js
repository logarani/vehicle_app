var express = require("express");
var router = express.Router();

const  credential = {
    username : "staff1",
    password : "12345"
}

// login user
router.post('/login', (req, res)=>{
    if(req.body.username == credential.username && req.body.password == credential.password){
        req.session.user = req.body.username;
        res.redirect('/route/dashboard');
    }else{
        res.end("Invalid Username")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorized User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
                     res.render('base')
                 }
    })
})

module.exports = router;