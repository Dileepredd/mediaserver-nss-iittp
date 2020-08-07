require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
// const session = require('express-session');
// const minifyHTML = require('express-minify-html');
const fs = require('fs');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session Declaration
// app.use(session({
//     secret: process.env.SESSIONPASS || "what da, no secret da",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 12 * 3600 * 1000
//     }
// }));

// Minify HTML
// app.use(minifyHTML({
//     override: true,
//     exception_url: false,
//     htmlMinifier: {
//         removeComments: true,
//         collapseWhitespace: true,
//         collapseBooleanAttributes: true,
//         removeAttributeQuotes: true,
//         removeEmptyAttributes: true,
//         minifyJS: true
//     }
// }));

// Uncomment this code with DBURL parameter in .env file to connect with database
/*
//Database URL
const DBURL = process.env.DBURL;

//Connecting Database
mongoose.connect(DBURL, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('Database is Connected...'))
    .catch((err) => console.log(err));
*/

// EJS Engine Setting
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Setting Public Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/'
}));

//is used to create dirs
// app.get("/mkdir/:dirname/*",function(req,res,next){
//     var urlcomponents = req.url.split(path.sep);
//     // console.log(urlcomponents)
//     var newpath = "./public/"
//     for(let i=3;i<urlcomponents.length;i++){
//         if (urlcomponents[i] !== "")newpath+=urlcomponents[i]+path.sep;
//     }
//     // console.log(newpath)
//     fs.mkdir(newpath+req.params.dirname,{recursive:true},(err)=>{
//         if(err) throw err;
//         console.log("dir is created");
//         res.send("for status view in console");
//     });
// });

// app.get("/rmdir/:dirname/*",function(req,res,next){
//     var urlcomponents = req.url.split(path.sep);
//     var newpath = "./public/"
//     for(let i=3;i<urlcomponents.length;i++){
//         if (urlcomponents[i] !== "")newpath+=urlcomponents[i]+path.sep;
//     }
//     fs.rmdir(newpath+req.params.dirname,{recursive:true},(err)=>{
//         if(err) throw err;
//         console.log("dir is removed");
//         res.send("for status view in console");
//     });
// });

app.use((req,res,next)=>{
    if(req.headers.USER === process.env.USER && req.headers.PASSWORD === process.env.PASSWORD){
        next();
    }
    else{
        res.send("you are not authorized to access media server");
    }
});

app.get("/ls/*",function(req,res,next){
    var urlcomponents = req.url.split(path.sep);
    var newpath = "./public/"
    for(let i=2;i<urlcomponents.length;i++){
        if (urlcomponents[i] !== "")newpath+=urlcomponents[i]+path.sep;
    }
    fs.readdir(newpath,(err,files)=>{
        if(err) throw err;
        // console.log(files);
        // res.send("for status view in console");
        res.json({
            files: files
        });
    });
});

app.post("/mkfile/*",function(req,res,next){
    var urlcomponents = req.url.split(path.sep);
    var newpath = "./public/"
    for(let i=2;i<urlcomponents.length;i++){
        if (urlcomponents[i] !== "")newpath+=urlcomponents[i]+path.sep;
    }
    fs.mkdir(newpath,{recursive:true},(err)=>{
        if(err) throw err;
        // console.log("dir is created");
        // console.log("files: ",req.files);
        req.files.sampleFile1.mv(newpath+req.files.sampleFile1.name,(err)=>{
            if(err) throw err;
            res.send("for status view in console");        
        })
    });
});

// app.post("/rmfile/*",(req,res,next)=>{
//     var urlcomponents = req.url.split(path.sep);
//     var newpath = "./public/"
//     for(let i=2;i<urlcomponents.length;i++){
//         if (urlcomponents[i] !== "")newpath+=urlcomponents[i]+path.sep;
//     }
//     fs.unlink(newpath,(err)=>{
//         if (err) throw err;
//         console.log("delete file: ",newpath);
//         res.send("for status view in console");
//     });
// });

// Routes
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/upload',(req,res)=>{
//     res.render('upload')
// });

// Sample Controller Routes
// app.use('/home',require('./controllers/home'));

app.listen(PORT, () => {
    console.log("Server is running on port : ",PORT);
});