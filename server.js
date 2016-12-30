var express     =   require("express");
var app         =   express();
var server      =   require("http").createServer(app);  
var io          =   require("socket.io")(server);
var router      =   express.Router();
var bodyParser  =   require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

io.on('connection', function(client){
    console.log("WebSocket connection established");
});

router.get("/",function(req,res){
    res.json({"message" : "Welcome to nodejs-websocket-server"});
});

router.route("/ledon")
    .post(function(req,res){
        var ledid = req.body.ledid;
        var ledcolor = req.body.ledcolor;
        var response = {"ledid" : ledid, "message" : "TurnOn", "ledcolor": ledcolor};

        io.emit('ledon',response);        
        res.json(response);
        console.log(response);
    });

router.route("/ledoff")
    .post(function(req,res){
        var ledid = req.body.ledid;
        var response = {"ledid" : ledid, "message" : "TurnOff"};

        io.emit('ledoff',response);        
        res.json(response);
        console.log(response);
    });

app.use('/',router);

server.listen(8080);
console.log("Listening to PORT 8080");