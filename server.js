require('dotenv').config()
const express=require('express')
const app = express();
const bodyParser=require('body-parser')
const router=require('./controller/url')
const path = require('path');
const connectDb=require('./db')
const fs=require('fs')
app.set("view engine","ejs")
app.set("views", path.resolve("./views"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'script')));
app.use((req,res,next)=>{
    const D=new Date()
    const log=`req from ${req.ip} on ${D.getDate()}-${D.getMonth()+1}-${D.getFullYear()} at ${D.getHours()}:${D.getMinutes()}:${D.getSeconds()} \n`
    fs.appendFile('logger.txt',log,(err,res)=>{
        next()
    })
})
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/',router)

connectDb().then(()=>{
    app.listen(3000,()=>{
        console.log('listening')
    })
})
