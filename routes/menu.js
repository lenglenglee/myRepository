
var con = require('../modules/dbConnector');
exports.getMenu=function(req, res){
	var map=function(){
		emit(this.year,1);
	}
	var reduce = function(key, values) {
		var x = 0;
		values.forEach(function(v) {
			x += v;
		});
		return x;
	}

	var db = con.connect();
	db.open(function(err, db) {
		db.collection('travelrecord', {
			safe: true
		}, function(err, collection) {
			collection.mapReduce(map,reduce,{out:'test'},function(err,collection){
					collection.find().toArray(function(err,results){
						collection.drop();
						res.setHeader('Content-Type', 'application/json;charset=utf-8');  
  						res.send(results);
					});	
			});
		});

	});
}