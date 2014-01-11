/*
 * GET home page.
 */
var con = require('../modules/dbConnector');
exports.index = function(req, res) {
	var db = con.connect();
	db.open(function(err, db) {
		db.collection('sys', {
			safe: true
		}, function(err, collection) {
			collection.findOne({name:'title'},function(err,result){
				res.render('index', { title: result.value });
			});
		});
	});


};