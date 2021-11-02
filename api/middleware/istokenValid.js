const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.slice(7)

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET, (err, _) => {
        console.log(err)
        if (err?.name) {
            console.log("delete")
            res.status(403).json("Token expired, please disconnect")
            return
        }
        next()
    })
}