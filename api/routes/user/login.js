const User = require('../../models/User')
const registerValidation = require('../../validation/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = async (req,res) => {
    const {error} = registerValidation.validate(req.body)

    if (error) {
        return res.status(403).json(error.details.map(({message})=> message))
        
    }
    //Check if user match

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json("No such mail")
    

    //Compare password

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json("Incorrect Password or wrong mail")

    // Create JWT

    const token = jwt.sign({_id: user._id, }, process.env.TOKEN_SECRET, {
        expiresIn: '1min'
    })

    //Add token

    user.accessToken = token

    await user.save()

    console.log(user)
    res.json(user)
    // res.header('auth-token', token).json(updatedUser)

    
}