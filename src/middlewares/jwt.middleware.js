import jwt from 'jsonwebtoken'

const jwtAuth = (req,res,next) => {

    const token  =  req.headers['authorization'];
    if(!token){
        return res.status(401).send('Unauthorized')
    }

    try {
        const payload = jwt.verify(
            token,
            "df9DU2NjOQVH7Kyq0zi96IF1izOWah93"
        );
        req.userID = payload.userID
    } catch (err) {
        return res.status(401).send('Unauthorized')
    }

    next()
}

export default jwtAuth;