var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Welcome to nodejs-websocket-server"});
});

router.route("/ledon")
    .post(function(req,res){
        var ledid = req.body.ledid;        
        res.json({"error" : false, "ledid" : ledid, "message" : "TurnOn"});
        console.log("TurnOn " + ledid);
    });

router.route("/ledoff")
    .post(function(req,res){
        var ledid = req.body.ledid;
        res.json({"error" : false, "ledid" : ledid, "message" : "TurnOff"});
        console.log("TurnOff " + ledid);        
    });

router.route("/ledcolor")
    .post(function(req,res){
        var ledid = req.body.ledid;
        var ledcolor = req.body.ledcolor;
        res.json({"error" : false, "ledid" : ledid, "message" : "ChangeColor", "ledcolor": ledcolor});
        console.log("ChangeColor " + ledid + " " + ledcolor);                
    });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");