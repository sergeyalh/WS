const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = process.env.PORT || 3000 ;
var store = {
	"games": [
		{"name": "game1", "year":"1999", "description": "dsdasad"},
		{"name": "game2", "year":"2000", "description": "dsdasad"}
	], 
	"movies":[
		{"name": "mov1", "year":"1988", "description": "1"},
		{"name": "mov2", "year":"2011", "description": "2"}
	],
	"cds":[
		{"name": "cd1", "year":"1988", "description": "vfds"},
		{"name": "cd2", "year":"2011", "description": "dsdasad"}
	]
};

app.get('/items',function(req,res) {
	res.json(store);
});

app.get('/items/:type',function(req,res) {
   	res.json(store[req.params.type]);
});

app.get('/items/:type/:id',function(req,res) {
	let type = store[req.params.type];
	res.json(type[req.params.id]);
});


app.get('/:fileName',function(req,res) {
   	res.sendFile(path.join(__dirname + '/client/' + req.params.fileName));
});

app.delete('/delete/:type/:name',function(req,res) {
   	console.log("DELETE " + req.params.type + " " + req.params.name);
   	let aFilterdArray = store[req.params.type].filter(function(el) { return el.name != req.params.name; });
	store[req.params.type] = aFilterdArray;
   	res.send("Deleted: "  + req.params.type + " " + req.params.name);
});

// parameters sent with 
app.post('/add', function(req, res) {
    var type = req.body.type;
    var name = req.body.name;
    var year = req.body.year;
    var description = req.body.description;

    let sNewTypeYAY = "";

    if (!store[type]) {
    	sNewTypeYAY = "NEW TYPE ! ";
    	store[type] = [];
    }

    store[type].push({"name": name, "year": year, "description":description});
		console.log("CREATE " + type + " " + name);
    res.send("Created: " + "sNewTypeYAY" + type + ' ' + name + ' ' + description);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})