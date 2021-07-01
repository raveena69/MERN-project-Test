const express = require('express');
const router = express.Router();
const validateUpdateUserInput = require('../../validation/updateConference');
const User = require('../../models/Conference');
const ConferenceApprove = require('../../models/ConferenceApprove');

router.post('/user-data', (req, res) => {
    User.find({}).select(['-id']).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
});

router.post('/user-data', (req, res) => {
    ConferenceApprove.find({}).select(['-id']).then(user => {
        if (user) {
            return res.status(200).send(user);
        }
    });
});

router.post('/user-delete', (req, res) => {
    ConferenceApprove.deleteOne({ _id: req.body._id}).then(user => {
        if (user) {
            return res.status(200).json({message: 'Conference Approve Status deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/user-update', (req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    ConferenceApprove.findOne({ _id }).then(user => {
        if (user) {
            let update = {'guestSpeaker': req.body.guestSpeaker, 'time': req.body.time, 'description': req.body.description, 'status': req.body.status, 'date': req.body.date};
            ConferenceApprove.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update Conference Approve Status.' });
                } else {
                    return res.status(200).json({ message: 'Conference Approve Status updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now Conference Approve Status found to update.' });
        }
    });
});


module.exports = router;
