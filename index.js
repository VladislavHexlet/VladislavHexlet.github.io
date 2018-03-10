var http = require('http');
var fs = require('fs');

fs.readFile('/index.html', function (err, data) {
  var server = http.createServer(function (request, response) {
    // content-length
    response.write(data);
    response.end();
  })

  var port = process.env.PORT || 3000;
  server.listen(port);
});
