import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }

},{timestamps:true})

adminSchema.pre("save", async function (next){
    if (!this.isModified('password')) {
        return next()
    }
this.password = await bcrypt.hash(this.password,10)
next()
})
adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

const Admin = mongoose.model('Admin',adminSchema);
export default Admin