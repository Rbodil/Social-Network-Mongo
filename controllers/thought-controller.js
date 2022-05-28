const { Thought, User } = require('../models');

const thoughtController = {

    getAllThoughts() {
        Thought.find()
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });

    },
    getThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtid })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userid },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.staus(404).json({ message: 'No user found with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    reThink(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtid }, req.body, { new: true, runValidators: true })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    unThink(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtid })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    }
}

module.exports = thoughtController;