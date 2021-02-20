module.exports.jsonParser = (req,res,next)=>{
    if(req.body.formData){
        req.body = JSON.parse(req.body.formData)
    }
    next()
} 