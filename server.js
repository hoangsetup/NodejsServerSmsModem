var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_add = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.send('Hello world! I am listening on '+ server_ip_add+':'+port);
});
io.on('connection', function (socket) {
	console.log(socket.id + ' is connected!');
	socket.on('push', function (data) {
		console.log(data);
		io.emit('sendmsg', {hash_sec: data.hash_sec, to: data.to, msg: data.msg});
	});
	socket.on('disconnect', function(){
		console.log(socket.id+' is disconnected!');
	});
	socket.on('result', function(data){
		console.log(data);
	});
});
http.listen(port, server_ip_add, function (){
	console.log('Server listening on '+server_ip_add+':'+port);
});
