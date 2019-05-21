const express = require('express');
const router = express.Router();

const friends = require('../data/friends');

/**
 * Determines the best friend match based on answer similarity.
 * @param {Array} scores Array of scores from POST body
 * @returns {Object} Best friend match
 */
const findBestMatch = (scores) => {
	const bestMatch = {
		totalDifference: 100,
		name: "",
		photo: ""
	};
	// loop though each friend
	for (let i = 0; i < friends.length; i++) {
		const friend = friends[i];
		const fscores = friend.scores;
		let thisPersonsTotalDiff = 0;
		// loop through each of the scores
		for (let j = 0; j < scores.length; j++) {
			// add up the difference between each of the
			// current user's answers and stored friend's answers
			thisPersonsTotalDiff += Math.abs(fscores[j] - scores[j]);
			// stop looking at this stored friend if the difference is already
			// more than the current best match
			if (thisPersonsTotalDiff > bestMatch.totalDifference) {
				break;
			}
		}
		// update bestMatch if we found a better one
		if (thisPersonsTotalDiff < bestMatch.totalDifference) {
			bestMatch.photo = friend.photo
			bestMatch.name = friend.name;
			bestMatch.totalDifference = thisPersonsTotalDiff;
		}
	}
	return bestMatch;
};

router.get('/api/friends', (req, res) => {
	res.json(friends);
});

router.post('/api/friends', (req, res) => {
	const newFriend = req.body;
	newFriend.scores = newFriend.scores.map(Number);
	const bestMatch = findBestMatch(newFriend.scores);
	res.json(bestMatch);
	friends.push(newFriend);
});

module.exports = router;
