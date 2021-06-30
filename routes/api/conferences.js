const express = require('express');
const router = express.Router();
const validateUpdateUserInput = require('../../validation/updateConference');
const User = require('../../models/Conference');

router.post('/user-add', (req, res) => {
    User.findOne({ email: req.body.guestSpeaker }).then(user => {
        if (user) {
            return res.status(400).json({ guestSpeaker: 'Guest Speaker already exists' });
        } else {
            const newUser = new User({
                guestSpeaker: req.body.guestSpeaker,
                time: req.body.time,
                description: req.body.description,
                date: req.body.date
            });
                    newUser.
                        save().
                            then(user => {
                            return res.status(200).json({message: 'User added successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
        }
    });
});

router.post('/user-data', (req, res) => {
    User.find({}).select(['-id']).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
});

router.post('/user-delete', (req, res) => {
    User.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'Guest Speaker deleted successfully. Refreshing data...', success: true})
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
            let update = {'guestSpeaker': req.body.guestSpeaker, 'time': req.body.time, 'description': req.body.description, 'date': req.body.date};
            User.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update Guest Speaker.' });
                } else {
                    return res.status(200).json({ message: 'Guest Speaker updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now Guest Speaker found to update.' });
        }
    });
});


module.exports = router;
