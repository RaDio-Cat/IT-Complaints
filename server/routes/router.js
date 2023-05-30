const express = require("express")
const route = express.Router()

const services = require("G:/NIB NSS/IT Complaints/server/services/render")
const controller = require('G:/NIB NSS/IT Complaints/server/controller/controller')

route.get('/',services.homeRoutes)

route.get('/list', services.listRoute)

route.get('/login', services.loginRoute)
route.get('/details', services.detailsRoute)

//API
route.post("/api/requests", controller.create)
route.get("/api/requests", controller.find)
//route.put("/api/requests/:id", controller.upgrade)
route.delete("/api/requests/:id", controller.delete)

module.exports = route