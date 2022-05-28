const router = require('express').Router();

const {
    getThought,
    getAllThoughts,
    createThought,
    reThink,
    unThink
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThought)
    .put(reThink)
    .delete(unThink);

module.exports = router;