const express = require('express');
const router = express.Router();

const friends = require('../data/friends');

router.get('/api/friends', (req, res) => {
	res.json(friends);
});

router.post('/api/friends', (req, res) => {
	const newFriend = req.body;
	const bestMatch = {
		totalDifference: 100,
		name: "",
		photo: ""
	}
	const newFriendScores = newFriend.scores;
	for (let i = 0; i < friends.length; i++) {
		const friend = friends[i];
		const scores = friend.scores;
		let thisPersonsTotalDiff = 0;
		for (let j = 0; j < scores.length; j++) {
			thisPersonsTotalDiff += Math.abs(scores[j] - newFriendScores[j]);
		}
		if (thisPersonsTotalDiff < bestMatch.totalDifference) {
			bestMatch.photo = friend.photo
			bestMatch.name = friend.name;
			bestMatch.totalDifference = thisPersonsTotalDiff;
		}
	}
	friends.push(newFriend);
	res.json(bestMatch);
});

module.exports = router;
