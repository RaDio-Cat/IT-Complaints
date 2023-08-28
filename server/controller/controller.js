const { findByIdAndUpdate } = require('G:/NIB NSS/IT Complaints/model/model')
var reqdb = require('G:/NIB NSS/IT Complaints/model/model')
var User = require('G:/NIB NSS/IT Complaints/model/user')
// const shortid = require('shortid')
// const {MongoClient} = require('mongodb')

// async function generateShortID(){
//     const client = new MongoClient('http://localhost:3000');
//     await client.connect();

//     const db = client.db('test')
//     const collection = db.collection('requests')

//     const  documents = await collection.find({}).toArray();

//     //Generate and assign IDs to each document
//     for(const document of documents){
//         document.shortID = shortid.generate();
//         await collection.replaceOne({_id:document._id}, document);
//     }
//     await client.close();
// }



//create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" })
        return
    }

    //new request
    const request = new reqdb({
        
        issuer: req.body.issuer,
        branch: req.body.branch,
        extension: req.body.extension,
        issue: req.body.issue,
        comment: req.body.comment,
    })

    //save user in database
    request.save(request)
        .then(data => {
            // res.send(data)
            res.redirect("/")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a complaint"
            })
        })
}

//retrieve and return all requests/ retrieve and return single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        console.log(id)
        reqdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:id + " not found"})
            }else{
                res.send({
                    ...data.toObject(),
                    formattedDateCreated: data.formattedDateCreated
                })
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Error retrieving request" + id})
        })
    } else {

        reqdb.find().
            then(request => {
                res.send(request)
                console.log(request.data)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurs while retrieving data" })
            })
    }

}

//Update a new identified request
exports.update = (req, res) => {
    if (req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" })
    }

    const id = req.params.id
    reqdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update request with ${id}. Maybe user not found` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error. Update user info" })
        })
}

//delete a request 
exports.delete = (req, res) => {
    const id = req.params.id

    reqdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot delete with${id}. Maybe id is incorrect` })
            } else {
                res.send({
                    message: "Complaint was deleted sucessfuly"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "could not delete complaint with id " + id
            })
        })
} 

//staff login
exports.signin = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await User.findOne({username})

        if(!user || !( await bcrypt.compare(password, user.password))){
            return res.render('requestform', {error: 'invalid email or password'})
        }
        req.session.user = user;
        res.redirect('/reqform');
    }catch(error){
        console.error(error);
        res.status(500).send('Server error');
    }
}