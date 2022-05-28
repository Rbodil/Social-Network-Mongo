const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    getOneUser({params}, res) {
        User.findOne({_id: params.userid})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
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
    createUser(req, res){
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.userid}, req.body, { new: true, runValidators: true }).then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    killUser(req, res){
        User.findOneAndDelete({_id: req.params.userid}).then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    }
};

module.exports = userController;
