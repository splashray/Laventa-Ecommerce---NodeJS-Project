import express from 'express'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { generateToken, isAdmin, isAuth } from '../utils'
// import { generateToken, isAuth } from '../utils'

const UserRouter = express.Router()

UserRouter.post('/signin', expressAsyncHandler( async(req,res)=>{
     
    const  signinUser = await User.findOne({email:req.body.email}) 
    if(!signinUser) return res.status(404).send({ message: 'User Not Found',})

    const  isPasswordCorrect = await bcrypt.compare(req.body.password, signinUser.password)
    if(!isPasswordCorrect) return res.status(400).send({ message: 'Wrong password or Email!'})

    if(signinUser.access === false) return res.status(400).send({ message: 'User access has been denied'})

    if(signinUser && isPasswordCorrect && (signinUser.access ===true)){
        res.status(200).send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            access: signinUser.access,
            details: signinUser.details,
            token: generateToken(signinUser),
        })
    }

}))

UserRouter.post('/register', expressAsyncHandler( async(req,res)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const user = new User({

        name: req.body.name,
        email: req.body.email,
        password: hash,
    })
    const createdUser = await user.save()
    if(!createdUser){
        res.status(401).send({ message: 'Invalid User Data',})
    }else{
        res.status(200).send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            access: createdUser.access,
            details: createdUser.details,
            token: generateToken(createdUser),
        })
    }
}))

UserRouter.put('/:id', isAuth, expressAsyncHandler( async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){ 
        res.status(401).send({ message: 'User Not Found',})
    }else{
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password

        user.firstName =  req.body.firstName || user.firstName
        user.lastName =  req.body.lastName || user.lastName 
        user.phone =  req.body.phone || user.phone 
        user.deliveryAddress =  req.body.deliveryAddress || user.deliveryAddress 
        user.additional =  req.body.additional || user.additional 
        user.town =  req.body.town || user.town 
        user.state =  req.body.state || user.state 
        user.company =  req.body.company || user.company 
        user.country =  req.body.country || user.country

        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            access: updatedUser.access,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phone: updatedUser.phone,
            deliveryAddress: updatedUser.deliveryAddress,
            additional: updatedUser.additional,
            town: updatedUser.town,
            state: updatedUser.state,
            company: updatedUser.company,
            country: updatedUser.country,
            token: generateToken(updatedUser),
        })
    }
}))


UserRouter.put('/pass/:id', isAuth, expressAsyncHandler( async(req,res)=>{  
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.npassword, salt)

    const user = await User.findById(req.params.id)
    if(!user){ 
        res.status(401).send({ message: 'User Not Found',})
    }else{
        const  isPasswordCorrect = await bcrypt.compare(req.body.opassword, user.password)
        if(!isPasswordCorrect){
             res.status(400).send({ message: 'Old Password is wrong!'})
        }else{
         user.password =  hash || user.password 
        const updatedUser = await user.save()
            res.send({
                _id: updatedUser._id,
                token: generateToken(updatedUser),
            
            })
        }
    }
}))

UserRouter.get('/:id', isAuth, expressAsyncHandler( async(req,res)=>{  
    const user = await User.findById(req.params.id);
    if(user){
     res.send(user);
    }else{
     res.status(404).send({message: 'User Not Found'})
    }

}))

UserRouter.get('/', isAuth, isAdmin, expressAsyncHandler( async(req,res)=>{  
    const user = await User.find({})
    if(user){
     res.send(user);
    }else{
     res.status(404).send({message: 'Users are Not Found'})
    }
    
}))


export default UserRouter;