const http = require('http');
const cookieParser = require('cookie-parser');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const category = require('./models/category');
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes')
const {requireAuth,checkUser }= require('./middlewares/authMiddleware')

const app = express()

//db Connection
const dbURL ="mongodb+srv://zobboX3:oMLgmqeeDe39MB1F@cluster0.gkpvrng.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURL , {useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//Packets
app.set("view engine","ejs");
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cookieParser())


app.listen(3000,'localhost',()=>{
    console.log('3000 de dinleniyor');
})

app.get('*',checkUser)

app.get('/',(req,res)=>{
  res.redirect('/blog')
})
//Routes
app.use('/',authRoutes)
app.use('/blog',blogRoutes)
app.use('/admin',requireAuth,adminRoutes)

app.get('/about',(req,res)=>{
    res.render('about',{title: 'Hakkında'})
})

//404
app.use((req,res)=>{
    res.status(404).render('404',{title: 'Sayfa Bulunamadı'})
})



