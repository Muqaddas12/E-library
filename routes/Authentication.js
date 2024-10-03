import express from 'express'
import Authentication from '../controller/Authentication.js'
import connection from '../Database.js'
import AuthMiddleware from '../utils/Cookies.js'

const router = express.Router()
//Login And SignUp routes
router.get('/', Authentication.GetLoginController)
router.get('/login', (req, res) => {
  res.redirect('/')
})
router.post('/Login', Authentication.PostLoginController)
router.post('/Signup', Authentication.PostSignupController)

export default router
