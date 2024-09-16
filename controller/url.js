const router=require('express').Router()
const shortid=require('shortid')
const URL=require('../model/schema')
const path=require('path')

router.route('/all')
.get(async(req,res)=>{
    try {
        const urls=await URL.find({})
    res.json({urls})
    } catch (error) {
        console.log(error)
    }
})

router.route('/:url')
.get(async(req,res)=>{
    try {
        let url=req.params.url
        console.log(url)
        const data=await URL.findOne({shortURL:url})
        if(data){
            const clicks=data.clicks
            const update=await URL.findByIdAndUpdate(data._id,{clicks:clicks+1})
            console.log(update)
            res.redirect(update.URL)
        }
        else{
            res.json({"msg":"sorry"})
        }
    } catch (error) {
        console.log(error)
        res.json({error})
    }
})

router.route('/')
.post(async(req,res)=>{
    try {
        let url=req.body.url
        console.log(url)
    const generatedURL=shortid.generate()
    await URL.create({shortURL:generatedURL,URL:url})
    res.json({success:true,"url":generatedURL})
    } catch (error) {
        console.log(error)
    }
})

module.exports=router