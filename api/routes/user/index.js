const router = require('express').Router()

const register = require('./register')
const login = require('./login')
const update = require('./update')
const del = require('./delete')
const all = require('./all')
const me = require('./me')

const isTokenValid = require('../../middleware/istokenValid')

router.post("/register", register)
router.post("/login", login)
router.patch("/update",isTokenValid, update)
router.delete("/delete/:id",isTokenValid, del)
router.get("/all",isTokenValid, all)
router.get("/me",isTokenValid, me)

module.exports = router