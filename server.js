const express= require("express");
const bodyParser =require("body-parser");
const request= require("request");
const path = require('path');
const axios = require('axios');
const PORT = process.env.PORT||3000




const app=express()

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
      else
        next()
    })
  }

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: true }));





app.get("/",function(req,res){
    res.render('index',{time:"",value:"", currency:"", error:""});
});



app.post("/insert",function(req,res){
    var country=(req.body.crypto);
    if(country!== "USD" && 
       country!== "AUD" &&
       country!== "BRL" &&
       country!== "CAD" &&
       country!== "CHF" &&
       country!== "CLP" &&
       country!== "CNY" &&
       country!== "DKK" &&
       country!== "EUR" &&
       country!== "GBP" &&
       country!== "HKD" &&
       country!== "INR" &&
       country!== "ISK" &&
       country!== "JPY" && 
       country!== "KRW" &&
       country!== "PLN" &&
       country!== "NZD" &&
       country!== "RUB" &&
       country!== "SEK" &&
       country!== "SGD" &&
       country!== "THB" &&
       country!== "TRY" &&
       country!== "TWD"){
           return res.render('index', {time:"",value:"", currency:"", error:"Waring don't try to manipulate Code"})
    }
    var baseLink="https://api.coindesk.com/v1/bpi/currentprice/";
    var finalURL= baseLink+country;
    let time
    let value
    let code
    axios.get(finalURL)
    .then((response)=>{
       time = response.data.time.updated
       value = response.data.bpi[country].rate;
       code = response.data.bpi[country].code;
       console.log(time,value,code);
       return res.render('index',{time:time ,value:value, currency:code, error:""})
    })
    .catch((error)=>{
      console.log(error);
      res.render('index',{time:"",value:"", currency:"", error:"Something went wrong"})
    })

    
});

app.use('*',(req,res)=>{
    res.send("<h1>404 :)</h1>")
})

app.listen(PORT,function(){
    console.log("server is running on port 3000");
});
