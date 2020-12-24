const express= require("express");
const bodyParser =require("body-parser");
const request=require("request");
const app=express()

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){
    var country=(req.body.crypto);
    var baseLink="https://api.coindesk.com/v1/bpi/currentprice/";
    var finalURL=baseLink+country+".json";

    request(finalURL,function(error,response,body){
        var data=JSON.parse(body);
        var time=data.time.updated; 
        var value=data.bpi[country].rate_float;
        res.write("<div class= container-sm jumbotron><h1>Latest time of update "+time +"</h1>");
        res.write("<h3>Current rate of Bitcoin is "+value+" "+ country+"</h3>")
        res.send();
    });
});

app.listen(8000,function(){
    console.log("server is running on port 8000");
});
