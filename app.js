const express = require("express");     //express include
const path = require("path")                          //including path
const multer  = require('multer')                //including multer
const {mergePdfs} = require('./merge')      //destructuring because it is a obj to get mergepdf func
const upload = multer({ dest: 'uploads/' })  //uploading files to upload folder using multer

const app = express();         //creating express obj
//port where site will run
const port = process.env.PORT || 3000   //defining port
app.use('/static',express.static(path.join(__dirname +'/public')))   //using express for static websites

app.get('/', (req, res) => {                                             //handling html page using express
    res.sendFile(path.join(__dirname,"templates/index.html"))
  })


app.post('/merge', upload.array('pdfs', 2),  async(req, res, next)=> {                    //using pdf merge utility to merge pdf
    // console.log(req.files)
    await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect("http://localhost:3000/static/merged.pdf")
    
    //res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
  
app.listen(port, ()=>{                                       //listening to port 3000
    console.log(`server is running at port no ${port}`);
})