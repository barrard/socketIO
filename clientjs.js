	
	  var socket = io();
	  socket.on('connection', function (data) {
	    console.log(data);
	    socket.emit('my other event', { my: 'data' });
	  });
