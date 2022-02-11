// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()
router.use(express.json())
const { validateActionId, validateAction } = require('./actions-middlware')

// - [X] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
// [GET] /api/actions                                                                                                                                                  
//  √ [15] sends back all actions that exist (39 ms)                                                                                                                  
//  √ [16] sends back empty array if no actions (47 ms)
router.get('/', (req, res) => {
    Actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message,
            customMessage: 'Actions get all error'
        })
    })
})

// - [X] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   [GET] /api/actions/:id                                                                                                                                              
//   √ [17] sends back the action with given id (31 ms)                                                                                                                
//   √ [18] responds with a 404 if no action with given id (38 ms)
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then((action) => {
        if(!action) {
            res.status(404).json({
                message: 'Action with the specified ID does not exist'
            })
        } else {
            res.status(200).json(action)
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message,
        })
    })
})

// - [X] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
//   [POST] /api/actions                                                                                                                                                 
//   √ [19] responds with the newly created action (43 ms)                                                                                                             
//   √ [20] inserts a new action into actions table (50 ms)                                                                                                            
//   √ [21] responds with a 400 if the request body is missing notes, description or project_id (38 ms)
router.post('/', (req, res) => {
    if(!req.body.description || !req.body.notes || !req.body.project_id) {
        res.status(400).json({
            message: 'Notes and description required'
        })
    } else {
        Actions.insert(req.body)
        .then((newAction) => {
            res.status(201).json(newAction)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
    }
})

// - [X] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   [PUT] /api/actions/:id                                                                                                                                              
//   √ [22] responds with the updated action (43 ms)                                                                                                                   
//   √ [23] updates the action in the actions table (45 ms)                                                                                                            
//   √ [24] responds with a 400 if the request body is missing missing notes, description, completed or project_id (38 ms) 
router.put('/:id', validateActionId, validateAction, async (req, res) => {
    console.log(req.params.id)
    const updatedAcion = await Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
    res.status(200).json(updatedAcion)
})

// - [X] `[DELETE] /api/actions/:id`
//   - Returns no response body.
// //   - If there is no action with the given `id` it responds with a status code 404.
// [DELETE] /api/actions/:id                                                                                                                                           
//         √ [25] deletes the action with the given id (112 ms)                                                                                                              
//         √ [26] responds with a 404 if no action with given id (37 ms)
router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then((deletedAction) => {
        if(!deletedAction) {
            res.status(404).json({
                message: 'The action with this ID does not exist'
            })
        } else {
            res.status(200).json()
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
})

module.exports = router