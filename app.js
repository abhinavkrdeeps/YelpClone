var express=require("express"),
    navigator=require("navigator"),
     requestIp = require('request-ip'),
     bodyParser=require("body-parser"),
     request=require("request"),
     satelize=require("satelize");
  

var app=express();

var place;

app.set("view engine","ejs");

var serveStatic = require('serve-static')

app.use(serveStatic('YelpClone/'))

 app.use(express.static('public'));
 
 app.use(bodyParser.urlencoded({extended:true}));

// Routes

app.get("/",function(req,res){
    
    if(navigator.geolocation){
        console.log("supported");
    }
    else{
        console.log("not");
    }
    
    res.render("home");
    
});

/////show each restaurant and let the user review it

app.get("/restaurant/:id",function(req,res){
    var main="https://maps.googleapis.com/maps/api/place/details/json?placeid=";
    var place_id=req.params.id;
    var api="&key=AIzaSyBlYH5yWzVPQ5aCWxdTerd7OwOJrtoa6q4";
    var url=main+place_id+api;
    console.log(url);
    request(url,function(err,response,body){
        if(!err&& response.statusCode==200)
        {
            var data=JSON.parse(body);
            //console.log(body.status);
            res.render("show",{data:data});
        }
        
    });
});


app.post("/",function(req,res){
    
     place=req.body.place;
    console.log(place);
    res.render("home");
    
});
            
            //-33.8670522,151.1957362
            
             app.use(requestIp.mw())

app.get("/restaurant",function(req, res) {
     var url="https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
        var loc="restaurants+in+"+place;
        var api="&key=AIzaSyBlYH5yWzVPQ5aCWxdTerd7OwOJrtoa6q4";
        var url1=url+loc+api;
        console.log(url1)
        request(url1,
              function(err,response,body){
                  
                  if(!err && response.statusCode==200)
                  {
                     var data=JSON.parse(body);
                     console.log(data.status);
                     res.render("restaurant",{data,data});
                  }
                  
              });
    });
    
app.get("/hospital",function(req,res){
     var url="https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
        var loc="hospitals+in+"+place;
        var api="&key=AIzaSyBlYH5yWzVPQ5aCWxdTerd7OwOJrtoa6q4";
        var url1=url+loc+api;
        
        request(url1,function(err,response,body){
            
            if(!err && response.statusCode==200){
                var data=JSON.parse(body);
                res.render("restaurant",{data,data});
            }
            
        });
    
    
});

/////bar
app.get("/bar",function(req,res){
     var url="https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
        var loc="bars+in+"+place;
        var api="&key=AIzaSyBlYH5yWzVPQ5aCWxdTerd7OwOJrtoa6q4";
        var url1=url+loc+api;
        
        request(url1,function(err,response,body){
            
            if(!err && response.statusCode==200){
                var data=JSON.parse(body);
                res.render("restaurant",{data,data});
            }
            
        });
});
            
////////  show and take review

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server connected........") 
});