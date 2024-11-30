import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
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
    dateOfBirth:{
        type:Date,
        required:true
    },
    education:{
        type: String,
        maxLength: 50,
        required: true
    },
    experience:{
        type: String,
        maxLength: 50,
        required: true
    },
    jobTitle:{
        type: String,
        maxLength: 50,
        required: true
    },
    requiredExperience:{
        type: String,
        maxLength: 50,
        required: true 
    },
    resume:{
        type: String,
        maxLength: 50,
        required: true  
    }
})

const applicationModel = mongoose.model('application', applicationSchema);

export default applicationModel;