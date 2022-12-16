const Blog = require('../models/blogs')
const Category = require('../models/category')



const adminIndex = (req,res)=>{
    Blog.find().sort({ createdAt: -1})
   .then((result)=>{
    res.render('admin',{title: 'Admin', blogs: result})
   })
   .catch((err)=>{
    res.status(404).render('404',{title: 'Sayfa Bulunamadı'})
   })
}

const adminAdd = (req,res)=>{
    res.render('add',{title: 'Yeni yazi'})
}

const adminAddPost = (req,res)=>{
    const blog = new Blog(req.body)
    Category.findById({name :'value'})
    blog.save()
    .then((result)=>{
        res.redirect('/admin')
    })
    .catch((err)=>{
        console.log(err)
    })
}

const adminDelete = (req,res)=>{
    const id =req.params.id
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({link:'/admin'})
    })
    .catch((err)=>{
        console.log(err);
    })
}


module.exports={
    adminIndex,
    adminAdd,
    adminAddPost,
    adminDelete
}