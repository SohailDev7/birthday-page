export default function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server) {
      // Mock API handlers
      const apiHandlers = {
        '/api/movies': {
          GET: async () => {
            // This would connect to MongoDB in production
            return { success: true, data: [] }
          },
          POST: async (req) => {
            return { success: true, data: req.body }
          }
        }
      }

      server.middlewares.use('/api', (req, res, next) => {
        const handler = apiHandlers[req.url]
        if (handler && handler[req.method]) {
          let body = ''
          req.on('data', chunk => body += chunk)
          req.on('end', async () => {
            try {
              const result = await handler[req.method]({
                ...req,
                body: body ? JSON.parse(body) : {}
              })
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result))
            } catch (error) {
              res.statusCode = 500
              res.end(JSON.stringify({ success: false, error: error.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}