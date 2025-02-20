const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

function logger (req, res, next) {
    console.log(`${req.method} request`)
    next()
}

const errHandling = (err, res) => {
    const status = err.status || 500
    res.status(status).json({
        message: err.message
    })
}

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/actions', logger, actionsRouter)
server.use('/api/projects', logger, projectsRouter)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
