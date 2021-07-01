const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../../validation/AddReviewer');
const validateUpdateUserInput = require('../../validation/updateReviewer');
const User = require('../../models/Reviewer');

router.post('/user-add', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            return res.status(200).json({message: 'Reviewer added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/user-data', (req, res) => {
    User.find({}).select(['-password']).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
});

router.post('/user-delete', (req, res) => {
    User.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'Reviewer deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/user-update', (req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    User.findOne({ _id }).then(user => {
        if (user) {
            // if (req.body.password !== '') {
            //     bcrypt.genSalt(10, (err, salt) => {
            //         bcrypt.hash(req.body.password, salt, (err, hash) => {
            //             if (err) throw err;
            //             user.password = hash;
            //         });
            //     });
            // }
            let update = {'firstName': req.body.firstName, 'lastName': req.body.lastName, 'email': req.body.email, 'username': req.body.username, 'password': user.password};
            User.updateOne({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update Reviewers.' });
                } else {
                    return res.status(200).json({ message: 'Reviewer updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now Reviewer found to update.' });
        }
    });
});


module.exports = router;
