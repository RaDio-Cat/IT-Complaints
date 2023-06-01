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
    const documentID = req.params.id;

    axios.get(`http://localhost:3000/api/requests/${documentID}`)
    .then(function(response) {
        const documentData = response.data;
        res.render("complaintsdetails", {requests:documentData});
    })
    .catch(function(error){
        res.send(error);
    })
}



// app.get('list', (req,res) => {
//     const test = "Sample test data";
//     res.render('complaintslist',{test})
// })