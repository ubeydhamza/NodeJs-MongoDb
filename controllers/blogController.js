const Blog = require('../models/blogs')


const blogIndex = (req,res)=> {
    Blog.find().sort({ createdAt: -1})
    .then((result)=>{
     res.render('index',{title: 'Anasayfa', blogs: result})
    })
    .catch((err)=>{
     res.status(404).render('404',{title: 'Sayfa Bulunamadı'})
    })
}

const blogContent= (req,res)=>{
    const id = req.params.id
    
    Blog.findById(id)
    .then((result)=>{
        res.render('blog',{blog: result , title: 'detay'})
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = {
    blogIndex,
    blogContent
}