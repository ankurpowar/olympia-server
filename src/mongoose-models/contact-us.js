import mongoose, { Schema } from "mongoose";

const contactUsSchema = new Schema({
    firstName:{
        type: String,
        maxLength: 50,
        required: true
    },
    lastName:{
        type: String,
        maxLength: 50,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        maxLength:50,
        validate: function(v){
            return /^(?![\w\.@]*\.\.)(?![\w\.@]*\.@)(?![\w\.]*@\.)\w+[\w\.]*@[\w\.]+\.\w{2,}$/.test(v)
        },
        
        required: true,
    },
    message:{
        type: String,
        maxLength: 200,
        required: true
    }
})

const contactUsModel = mongoose.model('contact-us', contactUsSchema);

export default contactUsModel;