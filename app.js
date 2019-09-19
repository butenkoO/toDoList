const express = require('express');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true,
useUnifiedTopology: true });
var ObjectId = require('mongodb').ObjectID;
app.use(express.json());
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    db = client.db("tests");
    app.listen(3000, function(){
        console.log("all right. Server on 3000 port!" + Date());
    });
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    db.collection("quest").find({}).sort({time:-1}).toArray(function(err, top){
        if(err) return console.log(err);
        res.render('index',{god:top});
    });
});

app.post('/newText', function(req, res){
    let text = req.body.text;
    db.collection('quest').insertOne({text:text, time: Date()});
    db.collection("quest").find({}).toArray(function(err, users){
        if(err) return console.log(err);
        res.send(users);
    });
});

app.post('/del-some-elemrnt', function(req, res){
    db.collection('quest').deleteOne({"_id": ObjectId(req.body.text)});
    db.collection("quest").find({}).toArray(function(err, users){
        if(err) return console.log(err);
        res.send(users);
    });
});

