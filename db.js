// const {MongoClient} = require('mongodb')

// let dbConnection

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect('mongodb://localhost:27017/IT_Complaints')
//         .then((client) => {
//             dbConnection = client.db()
//             return cb()
//         })
//         .catch(err => {
//             console.log(err)
//             return cb(err)
//         })
//     },
//     gettDb: () => dbConnection
// }   

// const { MongoClient } = require('mongodb')

// let dbConnection

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect('mongodb://127.0.0.1:27017/IT_Complaints')
//         .then((client) => {
//             dbConnection = client.db()
//             return cb()
//         })
//         .catch(err => {
//           console.log(err) 
//           return cb(err) 
//         })
//     },
//     getDb: () => dbConnection
// }