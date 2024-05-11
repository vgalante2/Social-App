const router = require('express').Router()




router.get('/', async (req, res) => {

    res.sendFile(path.join(__dirname, '../views/home.html'))

})


router.get('/:thoughtId/reactions', async (req, res) => {

    res.sendFile(path.join(__dirname, '../views/home.html'))

})









module.exports = router