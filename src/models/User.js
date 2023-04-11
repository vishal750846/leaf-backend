const mongoose =  require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    { 
        name : {
        type : String,
        required : true,
        trim : true,
        minlength : 2
        },
        business_name : {
            type :String,
            required : true,
            trim: true,
            minlength : 2
        },
        email : {
            type :String,
            required : true,
            trim: true,
            unique: true,
            validate(value){
                if (!validator.isEmail(value)) {
                    throw new Error('Not valid email') 
                }
                return true
            }
        },
        password : {
            type : String,
            required : true,
            trim : true,
            minlength : 6
        }
    }) 

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})

    if (!user) {
        throw new Error(404)
    }
    const isMatch = await bcrypt.compare(password , user.password)

    if (!isMatch) {
        throw new Error(401)
    }
    return user

}

userSchema.pre("save", async function(next){

        const user =this
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password,8)
        }        
        next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
