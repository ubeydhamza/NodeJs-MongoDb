const jwt = require('jsonwebtoken');
const User = require('../models/users')
const maxAge=60*60*24
const createToken=(id)=>{
    return jwt.sign({id},'gizli kelime',{expiresIn: maxAge})
}

const loginGet = (req,res)=>{
    res.render('login',{title: "Giris"})
}

const loginPost = async (req,res)=>{
    const { username,password } = req.body   
    try
    {
        const user = await User.login(username,password)
        const token = createToken(user.id)
        res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge*1000})
        res.redirect('/admin')
    }
    catch(e){
        console.log(e);
    }

}


const signupGet = (req,res)=>{
    res.render('signup',{title:"Kayit"})
}
const signupPost = (req,res)=>{
    const user = new User(req.body)
    user.save()
    .then((result) => {
     res.redirect('/login')  
     })
    .catch((err) => {
     console.log(err)
 });
}
const logoutGet = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/login')
}

module.exports ={
    loginGet,
    loginPost,
    signupGet,
    signupPost,
    logoutGet
}