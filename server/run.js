var io = require('socket.io')(3050),
  num = {},
  users = require('./networkers.json'),
  fs = require('fs'),
  totalConnections = 0;

io.on('connect', function (socket) {
  totalConnections++;
  if (!num[socket.id]) {
    num[socket.id] = true;
  }
  socket.on('users', function () {
    socket.emit('users', [Object.keys(num).length, totalConnections]);
    socket.broadcast.emit('users', [Object.keys(num).length, totalConnections]);
  });
  socket.on('insert', function (data) {
    if (typeof data.email === "undefined") {
      return;
    }
    var found = false;
    for (var i = 0, max = users.length; i < max; i++) {
      if (users[i].email === data.email) {
        found = true;
        break;
      }
    }
    if (!found) {
      users.push(data);
    }
    socket.emit('networkers', users);
    socket.broadcast.emit('networkers', users);
    try {
      fs.writeFileSync('./networkers.json', JSON.stringify(users));
    } catch (e) {
    }
    try {
      fs.appendFileSync('./networkers.bak.txt', JSON.stringify(data));
    } catch (e) {
    }
  });
  socket.on('networkers', function () {
    socket.emit('networkers', users);
    socket.broadcast.emit('networkers', users);
  });
  socket.on('disconnect', function () {
    if (num[socket.id]) {
      delete(num[socket.id]);
    }
    socket.broadcast.emit('users', [Object.keys(num).length, totalConnections]);
  });
});
console.log('listening');
