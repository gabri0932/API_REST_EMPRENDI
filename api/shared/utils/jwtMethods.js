import jwt from 'jsonwebtoken';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET

export function singNewJet(TokenContent, expiresIn = "7"){
    let token = "";

    try {
        token = jwt.sign(
            TokenContent,
            JWT_SECRET,
            {expiresIn}
        )
    } catch(error) {
        if(error instanceof Error){
            console.error('Error in jwtMethod.singNewJet: ', error)
        }
    }

    return token
}

export function verifyJwt(token){
    let result = {
        success: false,
        code: UNAUTHORIZED
    }

    try {
        const payLoad = jwt.verify(token, JWT_SECRET);

        result = {
            success:true,
            payLoad
        }

        return result
    } catch(error) {
        if(error instanceof Error){
            return result
        }
    }

    return result
}
