import jwt from 'jsonwebtoken'

const secretKey='Readily'

class AuthMiddleware{
    static createCookie(user,res){
        if(!user){
            return null
        }
        const payload={
            username:user.Username,
        }
        const token=jwt.sign(payload,secretKey)
        res.cookie('cid',token,{
            // httpOnly:true,
            maxAge:3600000,
        })

    }

    static verifyCookie(token){
        let verify
        if(!token){
            return null
        }
       try {
     verify = jwt.verify(token, secretKey)

       } catch (error) {
        console.log(error)
        return null
       }
        return verify

    }
}


export default AuthMiddleware