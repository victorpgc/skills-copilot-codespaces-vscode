// Create web server
// 1. Create express server
// 2. Create router
// 3. Create get route for comments
// 4. Create post route for comments
// 5. Create put route for comments
// 6. Create delete route for comments
// 7. Export router

const express = require('express');
const router = express.Router();

// Import comment model
const Comment = require('../models/Comment');

// GET route for comments
router.get('/', (req, res) => {
    Comment.find()
    .then(comments => res.json(comments))
});

// POST route for comments
router.post('/', (req, res) => {
    const newComment = new Comment({
        name: req.body.name,
        text: req.body.text
    });

    newComment.save()
    .then(comment => res.json(comment))
});

// PUT route for comments
router.put('/:id', (req, res) => {
    Comment.findById(req.params.id)
    .then(comment => {
        comment.name = req.body.name,
        comment.text = req.body.text

        comment.save()
        .then(comment => res.json(comment))
    })
});

// DELETE route for comments
router.delete('/:id', (req, res) => {
    Comment.findById(req.params.id)
    .then(comment => comment.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
});

module.exports = router;