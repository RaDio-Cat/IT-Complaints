// const express = require('express')
// const { ObjectId } = require('mongodb')
// const { connectToDb, getDb } = require('./db')




// const app = express()
// app.use(express.json())


// let db

// connectToDb((err) => {
//     if (!err) {
//         app.listen(3000, () => {
//             console.log('app listening on port 3000')
//         })
//         db = getDb()
//     }
// })

// //routes
// app.get('/requests', (req, res) => {
//     let books = []

//     db.collection('requests')
//         .find()
//         .sort({ Issuer: 1 })
//         .forEach(book => books.push(book))
//         .then(() => {
//             res.status(200).json(books)
//         })
//         .catch(() => {
//             res.status(500).json({ error: 'Could not fetch documents' })
//         })


// })

// app.get('/requests/:id', (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//         db.collection('requests')
//             .findOne({ _id: new ObjectId(req.params.id) })
//             .then(doc => {
//                 res.status(200).json(doc)
//             })
//             .catch(err => {
//                 res.status(500).json({ error: 'Could not fetch the document' })
//             })
//     }else{
//         res.status(500).json({error: 'Are you kidding?'})
//     }
// })

// app.post('/requests', (req,res) => {
//     const request = req.body

//     db.collection('requests')
//     .insertOne(request)
//     .then(result => {
//         res.status(201).json(result)
//     })
//     .catcn(err => {
//         res.status(500).json({err: 'Could not make new document'})
//     })
// })

// app.post('/submit', (req,res) => {
//     var issuer = req.body.issuer
//     var branch = req.body.branch
//     var issue = req.body.issue
//     var comment = req.body.comment

//     var data = {
//         "Issuer": issuer,
//         "Branch": branch,
//         "Issue": issue,
//         "Comment": comment
//     }
//     db.collection('details').insertOne(data, (err, collection) => {
//         if(err) throw err
//         console.log("Record inserted succesfully")
//     })
//     return res.redirect('staffpage.html')
// })

// app.get('/create',function(req,res){
//     res.set({
//        'Access-control-Allow-Origin': '*'
//     });
//     return res.redirect('requestform.html');
//  }).listen(3000)
 
//  console.log("server listening at port 3000");







// 






const express= require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const ejs = require('ejs')

const connectDB = require('G:/NIB NSS/IT Complaints/server/database/connection')

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to bodyParser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load  routes
app.use('/', require(('./server/routes/router')))

app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`))