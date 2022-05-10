var express = require("express");
var router = express.Router();
const request = require("request")

const dealer_url = "https://bb61co4l22.execute-api.us-west-2.amazonaws.com/development/dealers"
const vehicle_url = "https://bb61co4l22.execute-api.us-west-2.amazonaws.com/development/vehicles/122348"

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
        if(req.body.username != credential.username && req.body.password != credential.password){
            res.render('base',{errorMsg: "Invalid credentials"})
        }
        else if(req.body.username != credential.username){
            res.render('base',{errorMsg: "Invalid User Name"})
        }
        else {
             res.render('base',{errorMsg: "Invalid Password"})
        }
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        var data = ""
        request.get(dealer_url, (error,response)=> {
            var dealer_data = JSON.parse(response.body)

             if(dealer_data.length === undefined){
                 res.render('error')
             } else{
                data = dealer_data
                res.render('dashboard', {user: req.session.user, data : data})
            }
        })
    } else{
        //"Unauthorized User"
        res.render('base',{errorMsg: "Please login to continue"})
    }
})

// route for Error Page
router.get('/error', (req, res)=>{
    res.render('error',{user: req.session.user})
});

router.get('/vehicle', (req, res)=>{
    res.render('vehicle',{user: req.session.user})
});

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.render('error')
        }else{
            res.render('base')
        }
    })
})

module.exports = router;
