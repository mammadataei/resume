import http from 'http'
import { render } from './render'

const PORT = 8888

http
  .createServer(async (req, res) => {
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(render())
    }
  })
  .listen(PORT)

console.log('Dev server is running at: http://localhost:8888/')
