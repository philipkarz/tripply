const 
mongoose = require('mongoose')
userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

userSchema.methods.generateHash = function(password){
    //encrypt password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
    
    userSchema.methods.validPassword = function(password){
    //validate by comparing passwords {
    return bcrypt.compareSync(password, this.password)
    }


module.exports = mongoose.model('User', userSchema)