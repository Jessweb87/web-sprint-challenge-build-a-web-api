// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

// - [X] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.
router.get ('/', (req, res) => {
    Projects.get()
    .then(projects => {
        if (!projects) {
            res.status(200).json([])
        } else {
            res.status(200).json(projects)
        }
    })
    .catch (() => {
        res.status(500).json({
            message: 'error'
        })
    })
})

//- [X] `[GET] /api/projects/:id`
// - Returns a project with the given `id` as the body of the response.
// - If there is no project with the given `id` it responds with a status code 404.
router.get ('/:id', (req, res) => {
    Projects.get(req.params.id).then(project => {
        if (!project) {
            res.status(404).json({
                message: 'The project with this ID was not found',
            })
        } else {
            res.status(200).json(project)
        }
    })
    .catch(() => {
        res.status(500).json({
            message: 'Error'
        })
    })
})

// - [X] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
router.post ('/', (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        res.status(400).json({
            message: err.message
        })
    })
})

// //- [X] `[PUT] /api/projects/:id`
// - Returns the updated project as the body of the response.
// - If there is no project with the given `id` it responds with a status code 404.
// - If the request body is missing any of the required fields it responds with a status code 400.
router.put ('/:id', (req, res) => {
    const { id } = req.params
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: 'The project with the specified ID does not exist',
        })
    } else {
        Projects.update(id, req.body)
        .then(success => {
            res.status(400).json(success)
        })
        .catch(err => {
            res.status(500).json({
                message: err. message
            })
        })
    }
})

// - [X] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.
router.delete ('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then((deletedProject) => {
        if (!deletedProject) {
            res.status(404).json({
                message: 'The project with this ID does not exist',
            })
        } else {
            res.status(200).json()
        }
    })
    .catch(() => {
        res.status(500).json({
            message: 'error',
        })
    })
})

// - [X] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.
router.get ('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then((actions) => {
        if(!actions) {
            res.status(404).json({
                message: 'The project with this ID does not exist'
            })
        } else {
            Projects.getProjectActions(req.params.id).then((actions) => {
                res.status(200).json(actions)
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            message: 'error'
        })
    })
})


module.exports = router