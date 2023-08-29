const express = require("express")
const route = express.Router()

const services = require("G:/NIB NSS/IT Complaints/server/services/render")
const controller = require('G:/NIB NSS/IT Complaints/server/controller/controller')

route.get('/reqform',services.homeRoutes)

route.get('/list', services.listRoute)

route.get('/', services.loginRoute)
route.get('/details', services.detailsRoute)
route.get('/register', services.registerRoute)


//API
route.post("/api/requests", controller.create)
route.post("/api/staff", controller.signin)
route.post("/api/register", controller.register)
route.get("/api/requests", controller.find)
route.get("/api/requests/:id", controller.find)
// route.get("/api/staff", controller.find)
//route.put("/api/requests/:id", controller.update)
route.delete("/api/requests/:id", controller.delete)

module.exports = route


