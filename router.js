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
        res.end("Invalid Username")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
 if(req.session.user){

        request.get(dealer_url, (error,response)=> {
            const dealer_data = JSON.parse(response.body)
            req.session.dealer_data = dealer_data[0].brand
            console.log(req.session.dealer_data )
        })

        res.render('dashboard', {user : req.session.user},{dealer_data : req.session.dealer_data})
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



/*

request.get(dealer_url,function(req, res) {
    const dealer_data = JSON.parse(res.body)
    res.render('dashboard', { arr: dealer_data })
    console.log(dealer_data)
})
        fetch(dealer_url)
          .then(res => {
            console.log(res.ok) // true
            console.log(res.status) // 200
            const dealer_data = JSON.parse(response.body)
             console.log(dealer_data)
             res.render('dashboard', {dealer_data : dealer_data})
            return res.json()
          })

request({url : vehicle_url},(error,response) =>{
    const data = JSON.parse(response.body)
    console.log(data)
})*/

module.exports = router;