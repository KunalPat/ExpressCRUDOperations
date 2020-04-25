const express = require('express');
const app = express();
const api = require('./api');
const path = require('path');

app.use(express.urlencoded({extended:false}));
app.use('/welcome',express.static(path.join(__dirname,'public')));
app.use((req,res,next)=>{
    console.log("I am here first");
    next();
},(req,res,next)=>{
    /*if(req.get('token') === 'anything'){
        next();
    }else{
        console.log("token invalid");
        next(401);
    }*/
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.get('/',(req,res) =>{
    res.redirect('http://localhost:3000/welcome');
    //res.send("hello , it worked");
});

app.use('/api',api);

/*app.get('/user/:name/age/:age',(req,res) =>{
    res.send("hello , it is params"+req.params.name +"and "+req.params.age);
});*/

app.use((err,req,res,next)=>{
    console.log(err);
    res.send(err);
})

module.exports = app ;