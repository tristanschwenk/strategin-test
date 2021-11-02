const User = require('../../models/User')

module.exports = async (req, res) => {
    const users = await User.find()

    const usersToSend = users.map(user => ({...user.toObject(), password: undefined, email: undefined, accessToken: undefined, creationTime: undefined, updateTime: undefined}));

    console.log(usersToSend)

    res.status(200).json(usersToSend)
}