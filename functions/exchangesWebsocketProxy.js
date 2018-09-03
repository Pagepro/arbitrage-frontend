exports.handler = function (event, _, callback) {
  callback(null, {
    body: 'Not a WebSocket-over-HTTP request\n',
    headers: {'Content-Type': 'text/plain'},
    statusCode: 200
  })
}
