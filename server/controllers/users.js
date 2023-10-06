
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { hash } from "bcryot";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const {name, email, password } = req.body;

    if (name == '' || password == '' || email == '') {
        return res.json( {message : 'name, password, or email can not be blank'})
    }


    const user = await User.findOne({ email: email});

    if (!user) {
        res.json({ message: 'User does not exist!'})
    } 

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.json({ message: 'Password or email is incorrect'})
    }

    const token = jwt.sign({ id: user._id}, process.env.TOKEN_SECRET)
    res.json({ message: "Logged in successfully"})


}


export const register = async (req, res) => {
    const {name, email, password} = req.body;

    const user = await User.findOne({email: email})

    if (user) {
        res.json({ message: "User already exists!"})
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPass
    });

    await newUser.save()

    res.json("Success, thank you for signing up!")

}