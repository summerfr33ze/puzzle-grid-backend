const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
        username: {type: String, min: 5, max: 20, required:true},
        password: {type: String, min: 8, max: 20, required: true},
        admin_status: {type: Boolean, required: true}
})

    module.exports = mongoose.model("User", UserSchema)
