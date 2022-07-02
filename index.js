// index.js
// where your node app starts
// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
  //res.json({unix:"1451001600000" , utc: new Date()});
});

// A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
//A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
app.get("/api/:date?", function (req, res) {
  //console.log(req);
  console.log(req.params.date);
  var mia_data = new Date();

  try{
    if(req.params.date == undefined ){
      mia_data = new Date(); //se la data non e' definita metto data corrente
    } else {
		 mia_data = new Date(Date.parse(req.params.date));
		  var p = Date.parse(req.params.date);
		  if(p = Number(req.params.date)){ //se la data è in formato unix inizializzo opportunamente mia_data
			mia_data = new Date(Number(req.params.date))
		  } else {
		  mia_data = new Date(req.params.date); //valorizzo con la data passata in input
	  }
    }
  } catch(e){
    res.json({ error : "Invalid Date" });
  }
  var unix_key = Number(Math.round(mia_data.getTime()));
  if(isNaN(unix_key)){
    res.json({ error : "Invalid Date" });
  } else {
  var mds = mia_data.toString();
  var ddd = mds.split(' ')[0];

	let year = mia_data.getFullYear();
	let month = mia_data.toLocaleDateString('en-US', {
		month: 'short',
	  }) 
	let day = ("0" + mia_data.getDate()).slice(-2);
	let hour = ("0" + mia_data.getHours()).slice(-2);
	let minute = ("0" + mia_data.getMinutes()).slice(-2);
	let seconds = ("0" + mia_data.getSeconds()).slice(-2);
	let dayWeek = mia_data.toLocaleDateString('en-US', {
		weekday: 'short',
	  })  


  
  
	var stringa = dayWeek + ", " + day + " " + month + " " + year + " " + hour + ":" + minute + ":" + seconds + " GMT";
  
  var obj = {unix: unix_key, utc: stringa};
  console.log(obj);
  res.json(obj);
  }
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
