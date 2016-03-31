var jsonServer = require('json-server')
var server = jsonServer.create()

server.use(jsonServer.defaults({
  static: './htdocs'
}))

var router = jsonServer.router('./config/json/db.json')
server.use(router)
server.listen(3000)
