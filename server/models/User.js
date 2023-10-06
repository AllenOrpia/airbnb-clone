
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const User = new mongoose.model('users', userSchema);

export default User;