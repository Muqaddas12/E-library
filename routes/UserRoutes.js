import express from 'express'
import AuthMiddleware from '../utils/Cookies.js'
// import getdata from '../utils/getdata.js'

const router = express.Router()

router.get('/Dashboard', (req, res) => {
  if (!req.cookies) {
    return res.redirect('/')
  }
  const token = req.cookies.cid //cid is the name of my cookie

  const verify = AuthMiddleware.verifyCookie(token)
  if (!verify) {
    return res.redirect('/') // Redirect if the token is invalid
  }

  res.render('Dashboard', { title: 'Dashboard' })
})

router.get('/Explore', (req, res) => {
  res.render('Explore', { title: 'Explore' })
})

export default router
