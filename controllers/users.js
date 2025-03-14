const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    const allUsers = await User.find({});
    res.render('users/index.ejs', {
        users: allUsers,
    });
});

//Get /users/:userId/community/:userId
router.get('/:userId', async (req, res) => {
    const foundUser = await User.findById(req.params.userId);
    res.render('users/show.ejs', {
        user: foundUser,
        items: foundUser.pantry,
    })
});




module.exports = router;