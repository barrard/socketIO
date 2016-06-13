
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"},
    url = require('url'),
    path = require('path'),
    fs = require('fs');
var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs');


app.listen(8080);


function handler (req, res) {
 var uri = url.parse(req.url).pathname;
 var filename = path.join(process.cwd(), uri);
 console.log('proces curent directory '+process.cwd())
 console.log('uri '+uri)
 console.log('proces curent file name '+filename)
 console.log(fs.exists(filename, function(exists){
 	console.log(exists ? 'found it yes! its here '+filename : 'no can find '+filename)

 		var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
 		console.log(mimeType)
 		         res.writeHead(200, mimeType);

 		        var fileStream = fs.createReadStream(filename);
 		        fileStream.pipe(res);
 	
 }))

}





io.on('connection', function (socket) {
	console.log('connection?? ')
  socket.emit('connection', { connected: 'true' });


  socket.on('my other event', function (data) {
    console.log(data);
  });
})


