const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {type: String, required: true},
    staffID: {type: String, required: true}
}); 

const User = mongoose.model('staff', staffSchema)
module.exports = User