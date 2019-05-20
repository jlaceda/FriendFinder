const express = require('express');
const router = express.Router();

const friends = require('../data/friends');

router.get('/api/friendslist', function(req, res) {
	res.json(friends);
});

module.exports = router;