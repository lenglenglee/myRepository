/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var menu = require('./routes/menu');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/menu', menu.getMenu);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
var userlist = {};
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    userlist[socket.id] = socket;    
    console.log("Connection " + socket.id + " accepted.");    
    socket.on('message', function(message) {

        for (var key in userlist)  {
            userlist[key].send(message);
        }  
        console.log("Received message: " + message + " - from client " + socket.id);    
    });    
    socket.on('disconnect', function(obj) {
        console.log(obj);
        userlist[socket.id] = undefined;        
        console.log("Connection " + socket.id + " terminated.");    
    });
});