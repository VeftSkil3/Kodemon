express = require("express");
mongoose = require('mongoose');

var app = express();

// Database
mongoose.connect('mongodb://localhost/test');

var KodemonSchema=mongoose.Schema({
	execution_time: Number,
	timestamp: Date,
	token: String,
	key: String
});

var MonData=mongoose.model('MonData',KodemonSchema);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	console.log('Connected to MongoDB');
});

app.get('/api', function (req, res) {
	res.send('API is running');
});


// Returns json object containing distinct keys and the top _id for each key 
app.get('/api/kodemon/keys', function (req, res){
	return MonData.distinct('key', function (err, mondatas){
		if (err){
			sendErrorResult(res, err);
		}
		else{
			var keysArrayList = [];
			var counter = 0;

			for (var i=0;i<mondatas.length;i++){
				counter++;

				MonData.findOne({key:mondatas[i]}, '_id, key', function(err, keyInfo){
					if (err){
						sendErrorResult(res, err);
					} 
					else {
						counter--;
						keysArrayList.push({Id:keyInfo._id, Key: keyInfo.key});	
						if (counter == 0){
							sendResult(res, keysArrayList);
						}
					}
				});
			}		
		}
	});
});


//Returns json object containing execution time and date for a key
app.get('/api/kodemon/key/times/:id', function (req, res){
		MonData.findById(req.params.id,function (err, mondatas){
			if (err){
				sendErrorResult(res, err);
			}
			else {
				return MonData.find( { $query: {key: mondatas.key}, $orderby: {timestamp: -1} }, function (err, execInfo) {
					if (err) {
						sendErrorResult(res, err);
					} else {
						var execTimeList = [];
						for (var i=0;i<execInfo.length;i++){
							execTimeList.push({ExecTime: execInfo[i].execution_time, DateTime: execInfo[i].timestamp});
						}
						sendResult(res, execTimeList);
					}	
			});
		}
	});
});

//Returns json object containing execution time and date for a key filtered for a given date
app.get('/api/kodemon/key/times/:id/:datefrom/:dateto', function (req, res){
		var start = new Date(req.params.datefrom);
		var end = new Date(req.params.dateto);

		MonData.findById(req.params.id,function (err, mondatas){
			if (err){
				sendErrorResult(res, err);
			}
			else {
				return MonData.find( { $query: {key: mondatas.key, timestamp: {$lte: end, $gte: start} }, $orderby: {timestamp: -1} }, function (err, execInfo) {
					if (err) {
						sendErrorResult(res, err);
					} else {
						var execTimeList = [];
						for (var i=0;i<execInfo.length;i++){
							execTimeList.push({ExecTime: execInfo[i].execution_time, DateTime: execInfo[i].timestamp});
						}
						sendResult(res, execTimeList);
					}	
			});
		}
	});
});

//Sends the result back to the website 
function sendResult(res, obj) {
  console.log(obj);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(obj));
  return res.send();
}

//Sends error message back to the server 
function sendErrorResult(res, err){
  console.log(err);

  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(err));
  return res.send();

}

// Launch server
app.listen(4242, function(){
	console.log('WebServer is running');
});

