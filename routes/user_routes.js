const router = require('express').Router();
const { User } = require('../model');
const ObjectId = require('mongodb').ObjectId;


// CREATE A NEW USER
router.post('/users',async (req, res) => {
  try {
    const user = await User.create(req.body)
    req.session.user_id = user._id

    res.json({
        message: 'User created successfully',
        user
    })
  }
  catch (err) {
    console.log(err)
  }
})


// FIND ALL USERS
router.get('/users', async (req, res) => {
    try{
        const users = await User.find()
        req.session.user_id = users._id

        res.json({
            message: 'Users found successfully',
            users
        })
    }
    catch (err) {
        console.log(err)
    }
})


// // FIND USER BY ID
router.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        req.session.user_id = user._id

        res.json({
            message: 'User found successfully',
            user
        })
    }
    catch (err) {
        console.log(err)
    }
})


// UPDATE A USER BY ID/ UPDATE WITH JSON
router.put('/users/:id', async (req, res)=> {
    try{
        const updatedUser = await User.updateOne(
            {_id: new ObjectId(req.params.id)}, {$set: req.body} 
        )
        
        updatedUser.email = req.body.email 
        updatedUser.username = req.body.username
        updatedUser.password = req.body.password

        req.session.user_id = updatedUser._id

        res.json({
            message: 'User updated successfully',
            updatedUser
        })
    }
    catch (err) {
        console.log(err)
    }
})


// DELETE A USER BY ID
router.delete('/users/:id', async (req, res)=> {
try{
    const deletedUser = await User.findByIdAndDelete({_id: req.params.id})
 
    if (!deletedUser) return res.json({message: 'No User found.'})

    res.json({
        message: 'User deleted successfully'
       
    })

}
catch(err) {
    console.log(err)
}

})



module.exports = router