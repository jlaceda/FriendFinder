const express = require('express');
const router = express.Router();

const friends = require('../data/friends');

router.get('/api/friends', (req, res) => {
	res.json(friends);
});

router.post('/api/friends', (req, res) => {
	const newFriend = req.body;
	// get the number array representing the answers
	res.json(friends);
});

module.exports = router;
