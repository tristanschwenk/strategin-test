const User = require('../../models/User')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    const token = req.headers.authorization.slice(7)

    const verified = jwt.verify(token,process.env.TOKEN_SECRET)
    console.log(verified)

    const user = await User.findById(verified._id)
    console.log(user)

    res.status(200).json(user)


}