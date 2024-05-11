const router = require('express').Router()
const { Thought } = require('../model');
const ObjectId = require('mongodb').ObjectId;


router.post('/thought', async (req, res) => {
    try {
        const thought = await Thought.create(req.body)

        req.session.user_id = thought._id

        res.json({
            message: 'Your Thought has been created',
            thought
        })
    }
    catch (err) {
        console.log(err)
    }
    
    })

router.get('/thoughts', async (req, res) => {



})


router.get('/:thoughtId/reactions', async (req, res) => {

 

})









module.exports = router