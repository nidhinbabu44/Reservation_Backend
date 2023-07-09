const app = require("./app.js");

//routes
app.get('/',async(req,res,next)=>{
    res.send("API is running fine... ");
});



app.listen(6600,()=>{
    console.log('server is started');
});
