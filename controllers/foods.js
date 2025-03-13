const express = require('express');
const router = express.Router();
const User = require('../models/user');

//GET /user/:userID/foods
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            foods: currentUser.pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
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

//GET /users/:userId/foods/:itemId
router.get('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);

        res.render('foods/show.ejs', {
            item,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//Delete /users/:userId/foods/:itemId
router.delete('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.itemId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
        
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

//GET /users/:usreId/foods/:itemId/edit
router.get('/:itemId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);
    
        res.render('foods/edit.ejs', {
            item,
        });
        
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//PUT /users/:userId/foods/:itemId
router.put('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);
        item.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods/${req.params.itemId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



module.exports = router;