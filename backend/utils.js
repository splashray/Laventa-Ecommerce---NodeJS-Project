import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};


export const isAuth = (req, res, next) =>{
  const BearerToken = req.headers.authorization
  if(!BearerToken){
    res.status(401).send({message: 'Token is not supplied'})
  }else{
    const token = BearerToken.slice(7, BearerToken.length)
    jwt.verify(token, config.JWT_SECRET,(err, data)=>{
        if(err){
          res.status(401).send({message: 'Invalid Token'})
        }else{
          req.user = data
          next()
        }
    })
  }
}