const axios = require("axios")
const { application } = require("express")


exports.homeRoutes = (req, res) => {
    res.render("requestform")
}

exports.listRoute = (req, res) => {
    axios.get("http://localhost:3000/api/requests")
    .then(function(response){
        res.render("complaintslist",{requests:response.data})
    })
   .catch(err =>{
    res.send(err)
   })
}

exports.loginRoute = (req,res) => {
    res.render("login")
}


exports.detailsRoute = (req,res) => {
    res.render("complaintsdetails")
}

// app.get('list', (req,res) => {
//     const test = "Sample test data";
//     res.render('complaintslist',{test})
// })