import connection from '../Database.js'
import AuthMiddleware from '../utils/Cookies.js'

class Authentication {
  static PostSignupController (req, res) {
    console.log(req.body)
    const { firstname, lastname, day, month, year, gender, info, password } =
      req.body
    const dob = `${day}/${month}/${year}`
    const query = `insert into users(firstname,lastname,dob,email,mobile,password,gender) values (?,?,?,?,?,?,?)`
    connection.query(
      query,
      [firstname, lastname, dob, info, 0, password, gender],
      err => {
        if (err) {
          console.log('database ', err)
        } else {
          res.render('Dashboard', { title: 'Dashboard', name: firstname })
        }
      }
    )
  }

  static PostLoginController (req, res) {
    const user = req.body
    const query = `select * from users where email=? and password=?`

    connection.query(query, [user.Username, user.Password], (err, result) => {
      if (err) {
        console.error(err)
        return res.redirect('/') // Log error for debugging
      }

      if (result.length === 0) {
        // No user found with that email
        return res.redirect('/')
      }

      if (
        !(
          result[0].email === user.Username &&
          result[0].password === user.Password
        )
      ) {
        return res.redirect('/')
      }
      // Authentication successful
      AuthMiddleware.createCookie(user, res)
      return res.redirect('/user/Dashboard')
    })
  }

  static GetLoginController (req, res) {
    const token = req.cookies.cid

    // Check if the cookie exists
    if (!token) {
      return res.render('Authentication', { title: 'Authentication' })
    }

    // Verify the token
    const verify = AuthMiddleware.verifyCookie(token)
    if (!verify) {
      return res.render('Authentication', { title: 'Authentication' })
    }

    const query = `SELECT * FROM users WHERE email = ?`
    connection.query(query, [verify.username], (err, result) => {
      if (err) {
        console.error('Database query error:', err)
        return res.render('Authentication', { title: 'Authentication' }) // Handle gracefully
      }

      // Check if a user was found
      if (result.length > 0 && result[0].email === verify.username) {
        return res.redirect('/user/Dashboard')
      } else {
        // If no user matches, render authentication
        return res.render('Authentication', { title: 'Authentication' })
      }
    })
  }
}

export default Authentication
