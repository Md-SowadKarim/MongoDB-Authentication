const mongoose=require("mongoose")
//var encrypt = require('mongoose-encryption');

const userSchema=mongoose.Schema({
    email :{
        type:String,
        required: true
    },
    password :{
        type:String,
        required: true
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})

//============= mongoose encription ==================
// var encKey=process.env.ENC_KEY
// userSchema.plugin(encrypt, { secret: encKey, encryptedFields: ['password'] });
//=================================================================
module.exports=mongoose.model("user",userSchema)