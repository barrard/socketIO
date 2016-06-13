// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var socketArray=[]
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
 // console.log('proces curent directory '+process.cwd())
 // console.log('uri '+uri)
 // console.log('proces curent file name '+filename)
 fs.exists(filename, function(exists){
 	// console.log(exists ? 'found it yes! its here '+filename : 'no can find '+filename)
if (!exists) { fs.createReadStream('404.html').pipe(res);};
 fs.stat(filename, function(err, stats){
  if (err) {console.log(err)}
    else if (stats.isDirectory()){
      fs.createReadStream('404.html').pipe(res);
    }else{


 		var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
   //  console.log('the path ext name is '+path.extname(filename))
 		// console.log(mimeType)
     		         res.writeHead(200, mimeType);

 		        var fileStream = fs.createReadStream(filename);
 		        fileStream.pipe(res);


          }

        })    
 	
 })

}




 users = {}
io.on('connection', function (socket) {
  // if (socketArray.length===0) {
  //   socketArray[0]=socket.id
  //   console.log('Start of a chat log perhaps?')
  //   console.log('emiting the primaryChat Flag to this socket '+socket.id)
  //   socket.emit('yourThePrimeChatLog')
  // };
   console.log('connection?? ')
   console.log(socket.id)
   users[socket.id]= socket
   socketArray.push(socket.id)
   console.log('sockets array length '+socketArray.length)
   socket.emit('connection', {
     numberOfSockets : socketArray.length,
     primeChatId:socketArray[0],
    socketId: socket.id 
  });



 
  socket.on('getChatLog', function(data){
    console.log('the prime id is '+data)

    io.sockets.emit('lookingForPrime', data)
  })


  socket.on('primeChatLog', function(chatLog){
    console.log('I got the chatLog here '+chatLog)
    io.emit('some event', chatLog)
    console.log(socket.id)
    //socket.broadcast.emit('sendChatLogToNewGuy', chatLog)

  })
  socket.on('sendMeDataLogPlease', function(data){
    console.log(data+ ' is asking for sata')

    //socket.broadcast.to(data).emit('some event', 'hello!')
  })



socket.on('send', function(d){
  console.log(d)
  io.sockets.emit('update', d)
})



 socket.on('disconnect', function () {
  
   var n = socketArray.indexOf(this.id)
   console.log('diconnect this socket at '+n+' : '+this.id)
   socketArray.remove(n)
   console.log(socketArray.length)
   if (n===0) {
    console.log('n === 0 new prime '+socketArray[0])
   //io.sockets.emit('newPrime', socketArray[0])
 }
 });



socket.on('here is the prime data', function(d){
  console.log(d+" FUCK THIS")
})

socket.on('dragStart', function(d){
  console.log(d)
})

socket.on('dragMove', function(d){
  console.log(d)
})

socket.on('dragEnd', function(d){
  console.log(d)
})

socket.on('pointerDown', function(d){
  console.log(d.eventTarget)
  console.log(d.eventPositionY)
  console.log(d.eventPositionX)
 socket.broadcast.emit('SomepointerDown', d)
})

socket.on('pointerUp', function(d){
  //console.log(d)

})

})


