const express = require("express");
const app = express();
const port=8080;
const multer = require('multer'); 
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); 
const methodOverride = require('method-override');

// This tells multer how to store files
const storage = multer.diskStorage({
  
  // 1. Destination folder to save uploaded files
  destination: (req, file, callback) => {
    callback(null, 'public/uploads'); // Save inside public/uploads
  },

  // 2. Rename the uploaded file to avoid name conflicts
  filename: (req, file, callback) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    callback(null, uniqueName); // Example: 1717161234567.jpg
  }
});
const upload = multer({ storage: storage });

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static('public'));
app.use(express.static( path.join(__dirname,"public/css")));
// app.use(express.static( path.join(__dirname,"public/images")));

let posts = [
    {
        id: uuidv4(),
        username:"apnaclg",
        content:"luv coding",
        image:"/images/img1.jpg",
        profileImage:"/images/img2.jpg",
        createdAt: new Date()
    },
    {
        id: uuidv4(),
        username:"vaish",
        content:"luv gaming", 
        image:"/images/img2.jpg",
        profileImage:"/images/img1.jpg",
        createdAt: new Date()
    },

    {   
        id: uuidv4(),
        username:"deepu",
        content:"luv dancing",
        image:"/images/img1.jpg",
        profileImage:"/images/img2.jpg",
        createdAt: new Date()
    },
     {
        id: uuidv4(),
        username:"vaish",
        content:"luv gaming", 
        image:"/images/img2.jpg",
        profileImage:"/images/img1.jpg",
        createdAt: new Date()
    },
];

app.get("/posts", (req,res)=> {
    res.render("index.ejs",{ posts });
})

app.get("/posts/new", (req,res) => {
    res.render("new.ejs")
})


// app.post("/posts",(req,res)=> {
//     let { username, content } = req.body;
//     let id= uuidv4();
//     posts.push({id,username, content});
//     res.redirect("/posts");
// })


app.post('/posts', upload.fields([
    {name: 'postImage', maxCount: 1 },
  { name: 'profileImage', maxCount: 1 }
]), (req, res) => {
  const username = req.body.username;  // From the form
  const content = req.body.content;
  const postImage = req.files['postImage'] 
    ? '/uploads/' + req.files['postImage'][0].filename 
    : '/images/default-img.webp';

    const profileImage = req.files['profileImage']
    ? '/uploads/' + req.files['profileImage'][0].filename
    : '/images/default-img.webp';

    let id= uuidv4();
    const createdAt = new Date();

    posts.push({ id, username, content, image: postImage,profileImage });

  res.redirect('/posts');  // Go back to home or posts page
});

app.get("/posts/:id",(req,res)=>{
    let { id } =req.params;
    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.get("/users",(req,res)=>{
    res.render("profile.ejs");
})

app.get("/users/:username",(req,res)=>{
  const {username} = req.params;
  const userPosts =posts.filter(p => p.username === username);
  res.render("profile.ejs",{ username, posts:userPosts});
});

app.listen(port, ()=>{
    console.log(`Listening port:${port}`);
})