const { User, Thought } = require('../models');
const { db } = require('../models/User');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    getUserById({ params }, res) {
        User.findOne({
            _id: params.id
        })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'frinds',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate({
            _id: params.id
        },
            {
                new: true,
                runValidators: true
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User does not exist, try another ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({
            _id: params.id
        }, body, {
            new: true,
            runValidators: true
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User does not exist, try another ID!' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User does not exist, try another ID!' });
                    return;
                }
                res.json(dbUserData);
            }).catch(err => res.status(400).json(err))
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate({
            _id: params.userId
        }, { $pull: { friends: params.friendId } },
            {
                new: true
            }).then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;