const axios = require("axios")
const { application } = require("express")
const reqdb = require("../../model/model")


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

exports.registerRoute = (req,res) => {
    res.render("register")
}


exports.detailsRoute = (req,res) => {
    const documentID = req.query.id;
    console.log(documentID)

    axios.get(`http://localhost:3000/api/requests`,{
        params:{
            id: documentID
        }
    })
    .then(function(response) {
        //console.log(response.data)
        if(response){
            const documentData = response.data;
            res.render("complaintsdetails", {selectedDoc:documentData})
        }else{
            res.send("Document not found")
        }
       
    })
    .catch(function(error){
        res.send(error);
    })


    
}