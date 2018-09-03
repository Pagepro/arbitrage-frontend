var faasGrip = require('faas-grip')

exports.handler = function (event, _, callback) {
  var ws
  try {
    ws = faasGrip.lambdaGetWebSocket(event)
  } catch (err) {
    callback(null, {
      body: 'Not a WebSocket-over-HTTP request\n',
      headers: {'Content-Type': 'text/plain'},
      statusCode: 400
    })
    return
  }

  // if this is a new connection, accept it
  if (ws.isOpening()) {
    ws.accept()
  }

  // here we loop over any messages
  while (ws.canRecv()) {
    var message = ws.recv()

    // if return value is null, then the connection is closed
    if (message == null) {
      ws.close()
      break
    }

    // echo the message
    ws.send(message)
  }

  callback(null, ws.toResponse())
}
