const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thoughts_controller')

router.route('/')
    .get(getAllThoughts)
    .post(createThought)

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:thoughtId/reactions')
    .delete(removeReaction)

module.exports = router;