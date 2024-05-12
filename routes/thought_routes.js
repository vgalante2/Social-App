const router = require('express').Router()
const session = require('express-session');
const { Thought, Reaction } = require('../model');
const ObjectId = require('mongodb').ObjectId;


// CREATE A NEW THOUGHT
router.post('/thoughts', async (req, res) => {
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

    // GET ALL THOUGHTS
router.get('/thoughts', async (req, res) => {
   try{
    const thoughts = await Thought.find()
    req.session.user_id = thoughts._id
 
     res.json({
         message: 'Thoughts generated successfully',
         thoughts
     })
   }
   catch (err) {
    console.log(err)
   }
    
})

// GET THOUGHT BY ID
router.get('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id)
        req.session.user_id = thought._id

        res.json({
            message: 'Thought with ID found successfully',
            thought
        })
    }
    catch (err) {
        console.log(err)
    }
 
})

// UPDATE A THOUGHT BY ID/CHANGE WITH JSON
router.put('/thoughts/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.updateOne({
            _id: new ObjectId(req.params.id)}
            ,{$set: req.body})

            updatedThought.thoughtText = req.body.thoughtText

            res.json({
                message: 'Updated thought successfully',
                updatedThought
            })

}
catch (err) {
    console.log(err)
}
})


// Add a reaction to a thought
router.post('/thoughts/:id/reactions', async (req, res) => {
    try{
        const reaction = await Reaction.create(req.body)

        reaction.username = req.body.username
        reaction.reactionBody = req.body.reactionBody

        req.session.user_id = reaction._id

        res.json({
            message: 'Reaction posted successfully',
            reaction
        })
    }
    catch (err) {
        console.log(err)
    }
})


// DELETE A THOUGHT BY ID
router.delete('/thoughts/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete({_id: req.params.id})

        if(!deletedThought) return res.json({message: 'No thought found'})

            res.json({
                message: 'Deleted thought successfully'
            })
    }
    catch(err) {
        console.log(err)
    }
})








module.exports = router