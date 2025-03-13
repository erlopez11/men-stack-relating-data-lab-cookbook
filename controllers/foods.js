const express = require('express');
const router = express.Router();
const User = require('../models/user');

//GET /user/:userID/foods
router.get('/', (req, res) => {
    res.render('foods/index.ejs');
});

// GET /user/:userId/foods/new
router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

//POST /users/:userId/foods
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;