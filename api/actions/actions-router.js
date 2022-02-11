// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()
router.use(express.json())
const { validateActionId, validateAction } = require('./actions-middlware')

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

module.exports = router