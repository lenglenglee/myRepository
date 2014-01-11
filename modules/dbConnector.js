var mongodb = require('mongodb');

console.log('loadind db module');

exports.connect = function() {
	var server = new mongodb.Server('127.0.0.1', 1523, {
		auto_reconnect: true
	});
	var db = new mongodb.Db('myapp', server, {
		safe: true
	});
	return db;
}
